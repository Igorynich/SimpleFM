import {Club} from '../../interfaces/club';
import {Player} from '../../interfaces/player';
import {Action, ActionCreator, ActionType, createReducer, On, on} from '@ngrx/store';
import {
  addAttendanceForMatch, addFinanceRecord,
  addGainsAndLossesForMatch,
  addGoalScorersForMatch,
  addMatch,
  advanceAWeek, expandStadium,
  getClub, giveSeasonalPrizeMoney,
  gotBaseData,
  gotClub,
  gotPlayers, logOut, newJobTaken, oneMoreWeekOnCurrentJob, playersListedOnTransfer, playerTransferToAClub, playerTransferToCurClub,
  scheduleGenerated, setABunchOfResult, setResult,
  tablesGenerated,
  updatePlayers, updateTables
} from '../actions/current-game.actions';
import {Country} from '../../interfaces/country';
import {League} from '../../interfaces/league';
import {WeekSchedule} from '../../interfaces/league-schedule';
import {LeagueTable} from '../../interfaces/league-table';
import {BASE_POWER_TICKET_PRICES_COEF, CUP_INTERVAL} from '../../constants/general';
import {Match} from '../../interfaces/match';
import {MatchStats} from '../../interfaces/match-stats';
import {getLeagueWeek, isCupWeek, resultSplitter, sortClubsRoster, sortStarters} from '../../utils/sort-roster';
import {round} from 'lodash';
import {closest} from '../../utils/helpers';
import {FinanceRecord} from '../../interfaces/finance-record';
import produce, {Draft, enableMapSet} from 'immer';
import {Transfer} from '../../interfaces/transfer';

export interface CurrentGameState {
  currentWeek: number;
  currentSeason: number;
  weeksInASeason: number;
  currentClub: Club;
  currentPlayers: Player[];
  // data: {     // loaded from b/e
  countries: Country[];
  leagues: League[];
  clubs: Club[];
  players: Player[];
  scheduleShells: { [league_NumOfClubs: string]: any };
  // };
  finances: Map<string, { [week: number]: FinanceRecord[] }>;      // {[week: number]: Map<string, FinanceRecord[]>};
  gainsAndLosses: { [matchId: number]: { gains: Player[], losses: Player[] } };
  jobData: {
    weeksOnCurrentJob: number
  };
  loading: boolean;
  matches: { [id: number]: Match };
  schedule: { [leagueId: string]: WeekSchedule[][] };
  seasonData: {       // calculated at season start
    clubPowers: Map<string, number>       // <clubNameEn, power>    power - sum rank of starters
    ticketPrices: Map<string, number>       // <clubNameEn, ticketPrice>
  };
  stats: { [matchId: number]: MatchStats };
  tables: { [leagueId: string]: LeagueTable[] };
  transferData: {
    generatedForWeekNum: number;
    alreadySoldAPlayerThisWeekNum: number;
  };
  transferListedPlayers: Player[];
  transfers: Transfer[];
}

export const currentGameInitState: CurrentGameState = {
  currentWeek: 0,
  currentSeason: 0,
  weeksInASeason: 43,
  currentClub: null,
  currentPlayers: null,
  // data: null,
  countries: null,
  leagues: null,
  clubs: null,
  players: null,
  scheduleShells: null,
  finances: null,
  gainsAndLosses: null,
  jobData: {
    weeksOnCurrentJob: 0
  },
  loading: true,
  matches: {},
  schedule: null,
  seasonData: {
    clubPowers: null,
    ticketPrices: null
  },
  stats: {},
  tables: null,
  transferData: {
    generatedForWeekNum: 0,
    alreadySoldAPlayerThisWeekNum: 0,
  },
  transferListedPlayers: [],
  transfers: []
};

enableMapSet();

const _currentGameReducer = createReducer(currentGameInitState,
  on(gotBaseData, (state, {countries, leagues, clubs, players, scheduleShells}) => {
    console.log('gotBase Data', {
      ...state, countries, leagues, clubs, players, scheduleShells
    });
    return {
      ...state, countries, leagues, clubs, players, scheduleShells
    };
  }),
  on(gotClub, (state, {club}) => {
    // console.log('gotClub', {...state, currentClub: club});
    return {...state, currentClub: club};
  }),
  on(gotPlayers, (state, {players}) => {
    // console.log('gotPlayers', {...state, currentPlayers: players});
    return {...state, currentPlayers: players, loading: false};
  }),
  on(updatePlayers, (state, {newPlayers}) => {
    // console.log('updatePlayers', {...state, currentPlayers: newPlayers});
    return {...state, currentPlayers: newPlayers};
  }),
  on(scheduleGenerated, (state, {schedule}) => {
    // filling clubsPowers
    let map = new Map<string, number>();
    state.clubs.forEach((club: Club) => {
      const roster = state.players.filter((pl: Player) => pl.clubNameEn === club.nameEn);
      const starters = sortClubsRoster(roster).filter((value, index) => index < 11);
      // console.log(`Roster and Starters of ${club.nameEn} seasonData`, roster, starters);
      const power = starters.reduce((previousValue, currentValue) => previousValue + currentValue.power, 0);
      map.set(club.nameEn, power);
    });
    map = new Map<string, number>([...map].sort((a, b) => b[1] - a[1]));    // sort power desc
    //
    // generating ticketPrices
    const ticketPrices = new Map<string, number>();
    map.forEach((power, clubNameEn) => {
      const thresholds = Object.keys(BASE_POWER_TICKET_PRICES_COEF);
      ticketPrices.set(clubNameEn, BASE_POWER_TICKET_PRICES_COEF[closest(power, thresholds)]);
    });
    // console.log('scheduleGenerated', {...state, schedule, seasonData: {clubPowers: map, ticketPrices}});
    return {...state, schedule, seasonData: {clubPowers: map, ticketPrices}};
  }),
  on(tablesGenerated, (state, {tables}) => {
    // console.log('tablesGenerated', {...state, tables});
    return {...state, tables};
  }),
  on(advanceAWeek, state => {
    // console.log('advanceAWeek', {...state, currentWeek: state.currentWeek + 1});
    return {...state, currentWeek: state.currentWeek + 1};
  }),
  on(addMatch, (state, {match}) => {
    // console.log('addMatch', match); // {...state, matches: {...state.matches, ...match}});
    return {...state, matches: {...state.matches, ...match}};
  }),
  on(addFinanceRecord, (state, {clubNameEn, description, expense, income}) => {
    console.log('addFinanceRecord', clubNameEn, description, expense, income);
    const newState = produce(state, draft => {
      // old
      const map = new Map<string, { [week: number]: FinanceRecord[] }>();
      const week = draft.currentWeek;
      const finances = draft.finances ? new Map(draft.finances) : map;
      const clubsRecords: { [week: number]: FinanceRecord[] } = finances && finances.get(clubNameEn);
      if (!!clubsRecords) {
        clubsRecords[week] ? clubsRecords[week].push({description, expense, income}) : clubsRecords[week]
          = [{description, expense, income}];
        finances.set(clubNameEn, clubsRecords);
      } else {
        finances.set(clubNameEn, {[week]: [{description, expense, income}]});
      }
      //
      draft.finances = finances;
      const club = draft.clubs.find(value => value.nameEn === clubNameEn);
      // добавляем доходы-расходы в бюджет
      club.budget = club.budget + (income / 1000000 || 0) - (expense / 1000000 || 0);
      if (clubNameEn === draft.currentClub.nameEn) {      // если это нынешний клуб то добавляем доходы туда тоже
        draft.currentClub.budget = draft.currentClub.budget + (income / 1000000 || 0) - (expense / 1000000 || 0);
      }
    });
    return newState;
    // return {...state, finances};
  }),
  on(expandStadium, (state, {step, cost}) => {
    console.log('expandStadium', step, cost);
    const newState = produce(state, draft => {
      if (draft.currentClub.budget >= cost) {     // если достаточно денег
        draft.currentClub.budget -= cost;
        draft.currentClub.stadium += step;
        const curClub = draft.clubs.find(club => club.nameEn === draft.currentClub.nameEn);
        curClub.stadium += step;
        // add finance record
      }
    });
    console.log('expandStadium newState', newState);
    return newState;
  }),
  on(setResult, (state, {result, match}) => {
    let matchId;
    if ('matchId' in match) {       // match is WeekSchedule
      matchId = match.matchId;
    } else {                        // match is Match
      matchId = match.id;
    }
    return {...state, matches: {...state.matches, [matchId]: {...state.matches[matchId], result}}};
  }),
  on(setABunchOfResult, (state, {results, matches}) => {
    console.log('Setting A Bunch of Results', results, matches);
    if (matches.length !== results.length) {
      console.warn('Matches and Results have different lengths', matches, results);
      return {...state};
    }
    const matchesWithAddedResults = {};
    matches.forEach((match, index) => {
      let matchId;
      if ('matchId' in match) {       // match is WeekSchedule
        matchId = match.matchId;

      } else {                        // match is Match
        matchId = match.id;
      }
      matchesWithAddedResults[matchId] = {...state.matches[matchId], result: results[index]};
    });
    return {...state, matches: {...state.matches, ...matchesWithAddedResults}};
    // return {...state};
  }),
  on(addGoalScorersForMatch, (state, {matchId, goals, result}) => {
    return {...state, stats: {...state.stats, [matchId]: {...state.stats[matchId], ...goals, result}}};
  }),
  on(addGainsAndLossesForMatch, (state, {matchId, gains, losses}) => {
    const newState = produce(state, (draft: CurrentGameState) => {
      losses.forEach((pl: Player) => {
        const dataPlayer = draft.players.find(value => value.nameEn === pl.nameEn);
        if (!!dataPlayer) {
          if (dataPlayer.power > 0.1) {     // cant be less than 0.1
            dataPlayer.power = round(dataPlayer.power - 0.1, 1);
            if (!dataPlayer.gain) {
              dataPlayer.gain = 0;
            }
            dataPlayer.gain = round(dataPlayer.gain - 0.1, 1);
          }
        }
        const curPlayer = draft.currentPlayers.find(value => value.nameEn === pl.nameEn);
        if (!!curPlayer) {
          if (curPlayer.power > 0.1) {
            curPlayer.power = round(curPlayer.power - 0.1, 1);
            if (!curPlayer.gain) {
              curPlayer.gain = 0;
            }
            curPlayer.gain = round(curPlayer.gain - 0.1, 1);
          }
        }
      });
      gains.forEach((pl: Player) => {
        const dataPlayer = draft.players.find(value => value.nameEn === pl.nameEn);
        if (!!dataPlayer) {
          if (dataPlayer.power < 10) {    // cant be more than 10
            dataPlayer.power = round(dataPlayer.power + 0.1, 1);
            if (!dataPlayer.gain) {
              dataPlayer.gain = 0;
            }
            dataPlayer.gain = round(dataPlayer.gain + 0.1, 1);
          }
        }
        const curPlayer = draft.currentPlayers.find(value => value.nameEn === pl.nameEn);
        if (!!curPlayer) {
          if (curPlayer.power < 10) {
            curPlayer.power = round(curPlayer.power + 0.1, 1);
            if (!curPlayer.gain) {
              curPlayer.gain = 0;
            }
            curPlayer.gain = round(curPlayer.gain + 0.1, 1);
          }
        }
      });
      draft.gainsAndLosses = {...draft.gainsAndLosses, [matchId]: {gains, losses}};
    });
    return newState;
  }),
  on(addAttendanceForMatch, (state, {matchId, attendance}) => {
    return {
      ...state,
      stats: {...state.stats, [matchId]: {...state.stats[matchId], attendance}}
    };
  }),
  on(logOut, state => {
    console.warn('logOut', state);
    return currentGameInitState;
  }),
  on(updateTables, state => {
    // const curWeek = state.currentWeek;
    const newState = produce(state, draft => {
      const curWeek = draft.currentWeek;
      const curClub = draft.currentClub;
      const curLeague = draft.leagues.find(value => value.nameEn === curClub.leagueNameEn);
      const country = draft.countries.find(value => value.nameEn === curLeague.countryNameEn);
      const cupRounds = draft.schedule[country.id].length;
      console.warn(`STARTING UPDATING TABLES WEEK ${curWeek}`);
      if (isCupWeek(curWeek, cupRounds)) {     // cup       CUP_INTERVAL = 5
        console.warn(`UPDATING TABLES FOR CUP IN WEEK ${curWeek}`);
        const cupRound = (curWeek / CUP_INTERVAL) - 1;
        const cupSchedule: WeekSchedule[] = draft.schedule[country.id][cupRound];
        const cupScheduleNext: WeekSchedule[] = draft.schedule[country.id][cupRound + 1];
        if (!!cupScheduleNext) {    // if not final round of the cup
          const cupMatches: Match[] = cupSchedule.map(value => draft.matches[value.matchId]);
          const cupMatchesNext: Match[] = cupScheduleNext.map(value => draft.matches[value.matchId]);
          const newSchedule: WeekSchedule[][] = draft.schedule[country.id];
          newSchedule[cupRound + 1] = [];       // обнуляем след раунд
          const newMatches: { [id: number]: Match } = {};
          let nextRoundMatch: Match = {
            awayNameEn: undefined,
            homeNameEn: undefined,
            id: undefined,
            tournament: {nameRu: `Кубок ${country.nameRu}`, nameEn: `Cup of ${country.nameEn}`},
            isCupMatch: true
          };
          cupMatches.forEach((match: Match, index) => {
            const matchStats: MatchStats = draft.stats[match.id];
            const newId = (+Object.keys(draft.matches)[Object.keys(draft.matches).length - 1]) + 1;
            const nextRoundMatchIndex = Math.floor(index / 2);
            let isHomeAWinner = !!match.homeNameEn;
            if (matchStats?.result) {
              const [homeScore, awayScore] = matchStats.result.split(' - ');
              const [homeGoals, awayGoals] = resultSplitter(matchStats.result);
              isHomeAWinner = homeScore.includes('e') || homeScore.includes('p') || homeGoals > awayGoals;
            }
            const nextId = cupScheduleNext[nextRoundMatchIndex]?.matchId ? cupScheduleNext[nextRoundMatchIndex].matchId : newId;
            if (index % 2 === 0) {      // first match (decides homeNameEn for next)
              nextRoundMatch.homeNameEn = isHomeAWinner ? match.homeNameEn : match.awayNameEn;
            } else if (index % 2 === 1) {      // second match (decides awayNameEn for next)
              nextRoundMatch.awayNameEn = isHomeAWinner ? match.homeNameEn : match.awayNameEn;
              nextRoundMatch.id = nextId;
              newSchedule[cupRound + 1] = [...newSchedule[cupRound + 1], {matchId: nextRoundMatch.id}];
              newMatches[nextRoundMatch.id] = nextRoundMatch;
              nextRoundMatch = {      // reset
                awayNameEn: undefined,
                homeNameEn: undefined,
                id: undefined,
                tournament: {nameRu: `Кубок ${country.nameRu}`, nameEn: `Cup of ${country.nameEn}`},
                isCupMatch: true
              };
            }
          });
          draft.matches = {...draft.matches, ...newMatches};
        }

      } else {                                // league
        const leagues: League[] = draft.leagues;
        leagues.forEach((league: League) => {
          console.warn(`UPDATING TABLES FOR ${league.nameRu} LEAGUE IN WEEK ${curWeek}`);
          const tableRecords: LeagueTable[] = draft.tables[league.id] ? draft.tables[league.id] : [];
          const curWeekSchedule: WeekSchedule[] = draft.schedule[league.id] ?
            draft.schedule[league.id][getLeagueWeek(curWeek, cupRounds)] : [];
          if (curWeekSchedule?.length) {      // check for league not finished
            const curWeekMatches: Match[] = curWeekSchedule.map((value: WeekSchedule) => draft.matches[value.matchId]);
            curWeekMatches.forEach((match: Match) => {
              const matchStats = draft.stats[match.id];
              const home: Club = draft.clubs.find(value => value.nameEn === match.homeNameEn);
              const away: Club = draft.clubs.find(value => value.nameEn === match.awayNameEn);
              if (matchStats?.result && !match.isCupMatch) {      // если есть result и матч не кубковый
                const homeRecord: LeagueTable = tableRecords.find(record =>
                  home.nameEn === record.clubName || home.nameRu === record.clubName);
                const awayRecord: LeagueTable = tableRecords.find(record =>
                  away.nameEn === record.clubName || away.nameRu === record.clubName);
                if (homeRecord && awayRecord) {
                  const [homeGoals, awayGoals] = resultSplitter(matchStats.result);
                  if (homeGoals > awayGoals) {
                    homeRecord.wins++;
                    awayRecord.loses++;
                    homeRecord.points += 3;
                  } else if (homeGoals < awayGoals) {
                    homeRecord.loses++;
                    awayRecord.wins++;
                    awayRecord.points += 3;
                  } else if (homeGoals === awayGoals) {
                    homeRecord.draws++;
                    awayRecord.draws++;
                    homeRecord.points += 1;
                    awayRecord.points += 1;
                  }
                  homeRecord.gf += homeGoals;
                  homeRecord.ga += awayGoals;
                  awayRecord.gf += awayGoals;
                  awayRecord.ga += homeGoals;
                  homeRecord.games++;
                  awayRecord.games++;
                  homeRecord.gd = homeRecord.gf - homeRecord.ga;
                  awayRecord.gd = awayRecord.gf - awayRecord.ga;
                }
              }
            });
          }
        });
      }
    });
    return newState;
  }),
  on(playersListedOnTransfer, (state, {listedPlayers}) => {
    return produce (state, draft => {
      draft.transferData.generatedForWeekNum = draft.currentWeek;
      draft.transferListedPlayers = listedPlayers;
    });
  }),
  on(playerTransferToCurClub, (state, {player}) => {
    const newState = produce(state, draft => {
      const curClub = draft.currentClub;
      if ((curClub.budget - player.price) >= 0) {
        const curPlayers = draft.currentPlayers;
        const curClubInClubsList = draft.clubs.find(value => value.nameEn === curClub.nameEn);
        const playerInList = draft.players.find(value => value.nameEn === player.nameEn);
        const playersClub = draft.clubs.find(value => value.nameEn === playerInList.clubNameEn);
        // changing players Club
        playerInList.clubNameEn = curClub.nameEn;
        playerInList.clubNameRu = curClub.nameRu;
        // pushing player to Current Players
        curPlayers.push(playerInList);
        // removing player from TransferList
        draft.transferListedPlayers = draft.transferListedPlayers.filter(value => value.nameEn !== player.nameEn);
      }
    });
    return newState;
  }),
  on(playerTransferToAClub, (state, {player, clubsNameEn}) => {
    const newState = produce(state, (draft: CurrentGameState) => {
      const playersNewClub = draft.clubs.find(value => value.nameEn === clubsNameEn);
      if ((playersNewClub.budget - player.price) >= 0) {
        const playerInList = draft.players.find(value => value.nameEn === player.nameEn);
        // updating Transfer Data alreadySoldAPlayerThisWeekNum constant
        if (playerInList.clubNameEn === draft.currentClub.nameEn) {
          draft.transferData.alreadySoldAPlayerThisWeekNum = draft.currentWeek;
        }
        // changing players Club
        playerInList.clubNameEn = playersNewClub.nameEn;
        playerInList.clubNameRu = playersNewClub.nameRu;
        // removing player from Current Players
        draft.currentPlayers = draft.currentPlayers.filter(value => value.nameEn !== player.nameEn);
        // sorting
        draft.currentPlayers = sortClubsRoster(draft.currentPlayers);
      }
    });
    return newState;
  }),
  on(oneMoreWeekOnCurrentJob, (state) => {
    return produce(state, (draft: CurrentGameState) => {
      draft.jobData.weeksOnCurrentJob++;
    });
  }),
  on(newJobTaken, (state, {clubsNameEn}) => {
    const newState = produce(state, (draft: CurrentGameState) => {
      const newClub: Club = draft.clubs.find(value => value.nameEn === clubsNameEn);
      draft.currentClub = newClub;
      draft.currentPlayers = sortClubsRoster(draft.players.filter(pl => pl.clubNameEn === newClub.nameEn));
      draft.jobData.weeksOnCurrentJob = 0;
    });
    return newState;
  }),
  /*on(giveSeasonalPrizeMoney, (state) => {
    const newState = produce(state, (draft: CurrentGameState) => {
      const curClub = draft.currentClub;
      const curLeague = draft.leagues.find(value => value.nameEn === curClub.leagueNameEn);
      const curCountry = draft.countries.find(value => value.nameEn === curLeague.countryNameEn);
      const countryLeagues = draft.leagues.filter(value => value.countryNameEn === curLeague.countryNameEn);
      countryLeagues.forEach((league: League) => {
        const clubs = draft.clubs
      });
    });
    return newState;
  }),*/
);

export function currentGameReducer(state: CurrentGameState, action: Action) {
  return _currentGameReducer(state, action);
}
