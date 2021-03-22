import {Club} from '../../interfaces/club';
import {Player} from '../../interfaces/player';
import {Action, ActionCreator, ActionType, createReducer, On, on} from '@ngrx/store';
import {
  addAttendanceForMatch,
  addFinanceRecord,
  addGainsAndLossesForMatch,
  addGoalScorersForMatch,
  addMatch, addTransferRecord, advanceASeason,
  advanceAWeek,
  expandStadium,
  gotBaseData,
  gotClub,
  gotPlayers, loading, loadSavedGame,
  logOut,
  newJobTaken,
  oneMoreWeekOnCurrentJob,
  playersListedOnTransfer,
  playerTransferToAClub,
  playerTransferToCurClub,
  rotateClubs,
  scheduleGenerated,
  seasonalChangeOfPlayersPowers,
  setABunchOfResult,
  setResult, setUserName,
  tablesGenerated,
  updatePlayers,
  updateTables
} from '../actions/current-game.actions';
import {Country} from '../../interfaces/country';
import {League} from '../../interfaces/league';
import {WeekSchedule} from '../../interfaces/league-schedule';
import {LeagueTable} from '../../interfaces/league-table';
import {
  BASE_LEAGUE_TIER_TICKET_PRICES_COEF,
  BASE_POWER_TICKET_PRICES_COEF,
  CUP_INTERVAL,
  SEASONAL_POWER_CHANGE_RANGE
} from '../../constants/general';
import {Match} from '../../interfaces/match';
import {MatchStats} from '../../interfaces/match-stats';
import {getLeagueWeek, isCupWeek, resultSplitter, sortClubsRoster} from '../../utils/sort-roster';
import {round, cloneDeep} from 'lodash';
import {closest, objToArr, randomInteger} from '../../utils/helpers';
import {FinanceRecord} from '../../interfaces/finance-record';
import produce, {Draft, enableMapSet} from 'immer';
import {Transfer} from '../../interfaces/transfer';
import {mapValues} from 'lodash';

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
  gainsAndLosses: { [matchId: number]: { gains: string[], losses: string[] } };     // string === playerNameEn[]
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
  userName: string;
}

export const currentGameInitState: CurrentGameState = {
  currentWeek: 0,
  currentSeason: 0,
  weeksInASeason: 45,
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
  loading: false,
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
  transfers: [],
  userName: ''
};

enableMapSet();

const _currentGameReducer = createReducer(currentGameInitState,
  on(loading, (state, {status}) => {
    const newState = produce(state, (draft: CurrentGameState) => {
      draft.loading = status;
    });
    return newState;
  }),
  on(loadSavedGame, (state, {data}) => {
    console.warn('LOADED DATA', data);
    const newState = produce(state, (draft: CurrentGameState) => {
      // const objToArr = (obj) => Object.keys(obj).map(key => obj[key]);
      draft.currentWeek = data.currentWeek;
      draft.currentSeason = data.currentSeason;
      draft.weeksInASeason = data.weeksInASeason;
      draft.currentClub = data.currentClub;
      // draft.currentClub = {...data.currentClub};
      draft.currentPlayers = objToArr(data.currentPlayers);
      draft.countries = objToArr(data.countries);
      draft.leagues = objToArr(data.leagues);
      draft.clubs = objToArr(data.clubs);
      draft.players = objToArr(data.players);
      draft.scheduleShells = data.scheduleShells;
      // draft.scheduleShells = {...data.scheduleShells};
      draft.finances = data.finances;
      draft.gainsAndLosses = data.gainsAndLosses;
      // draft.gainsAndLosses = {...data.gainsAndLosses};
      draft.jobData.weeksOnCurrentJob = data.jobData.weeksOnCurrentJob;
      draft.loading = data.loading;
      draft.matches = data.matches;
      draft.schedule = data.schedule;
      // draft.matches = {...data.matches};
      // draft.schedule = {...data.schedule};
      draft.seasonData.clubPowers = data.seasonData.clubPowers;
      draft.seasonData.ticketPrices = data.seasonData.ticketPrices;
      draft.stats = data.stats;
      draft.tables = data.tables;
      draft.transferData = data.transferData;
      /*draft.stats = {...data.stats};
      draft.tables = {...data.tables};
      draft.transferData = {...data.transferData};*/
      draft.transferListedPlayers = objToArr(data.transferListedPlayers);
      draft.transfers = objToArr(data.transfers);
      draft.userName = data.userName;
    });
    return newState;
  }),
  on(setUserName, (state, {userName}) => {
    return {
      ...state, userName
    };
  }),
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
    const thresholds = Object.keys(BASE_POWER_TICKET_PRICES_COEF);
    state.leagues.forEach(league => {
      const clubs = state.clubs.filter(value => value.leagueNameEn === league.nameEn);
      const multi = BASE_LEAGUE_TIER_TICKET_PRICES_COEF[league.tier];
      clubs.forEach(club => {
        const power = map.get(club.nameEn);
        ticketPrices.set(club.nameEn, BASE_POWER_TICKET_PRICES_COEF[closest(power, thresholds)] * multi);
      });
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
  on(advanceASeason, state => {
    const newState = produce(state, draft => {
      draft.currentSeason++;
      draft.currentWeek = 0;
      draft.finances = null;
      draft.gainsAndLosses = null;
      draft.matches = {};
      draft.stats = {};
      draft.players.forEach(pl => pl.gain = 0);
      draft.currentPlayers.forEach(pl => pl.gain = 0);
    });
    console.warn('advanceASeason');
    return newState;
  }),
  on(addMatch, (state, {match}) => {
    // console.log('addMatch', match); // {...state, matches: {...state.matches, ...match}});
    return {...state, matches: {...state.matches, ...match}};
  }),
  on(addFinanceRecord, (state, {clubNameEn, description, expense, income}) => {
    // console.log('addFinanceRecord', clubNameEn, description, expense, income);
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
    // console.warn(`REDUCER ADD MATCH STATS FOR ${matchId} START`);
    const mapped = {
      homeRoster: goals.homeRoster.map(value => value.nameEn),
      awayRoster: goals.awayRoster.map(value => value.nameEn),
      homeGoals: mapValues(goals.homeGoals, (obj) => obj.nameEn),
      homeAssists: goals.homeAssists ? mapValues(goals.homeAssists, (obj) => obj?.nameEn) : null,
      awayGoals: mapValues(goals.awayGoals, (obj) => obj.nameEn),
      awayAssists: goals.awayAssists ? mapValues(goals.awayAssists, (obj) => obj?.nameEn) : null,
      matchId,
      result
    };
    // console.warn(`REDUCER ADD MATCH STATS FOR ${matchId} FINISH`, mapped);
    // console.warn(`REDUCER ADD MATCH STATS FOR ${matchId} FINISH1`, {...state.stats[matchId]});
    // console.warn(`REDUCER ADD MATCH STATS FOR ${matchId} FINISH2`, {[matchId]: {...state.stats[matchId], ...mapped}});
    return {...state, stats: {...state.stats, [matchId]: {...state.stats[matchId], ...mapped}}};
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
      draft.gainsAndLosses = {...draft.gainsAndLosses, [matchId]: {
        gains: gains.map(pl => pl.nameEn),
        losses: losses.map(pl => pl.nameEn)
      }};
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
    return produce(state, draft => {
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
        // remove player from transferList
        draft.transferListedPlayers = draft.transferListedPlayers.filter(pl => pl.nameEn !== player.nameEn);
      }
    });
    return newState;
  }),
  on(addTransferRecord, (state, {transfer}: {transfer: Transfer}) => {
    return produce(state, (draft: CurrentGameState) => {
      const transferData: Transfer = {
        ...transfer,
        season: transfer.season === null ? draft.currentSeason : transfer.season,
        week: transfer.week === null ? draft.currentWeek : transfer.week
      };
      draft.transfers.push(transferData);
    });
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
  on(seasonalChangeOfPlayersPowers, (state) => {
    const newState = produce(state, (draft: CurrentGameState) => {
      draft.players.forEach((pl: Player) => {
        if (pl.power > 9) {
          pl.power = 9;
        }
        if (pl.power < 1) {
          pl.power = 1;
        }
        const negRange = SEASONAL_POWER_CHANGE_RANGE >= pl.power ? (pl.power - 0.1) : SEASONAL_POWER_CHANGE_RANGE;
        const posRange = SEASONAL_POWER_CHANGE_RANGE >= (10 - pl.power) ? (10 - pl.power - 0.1) : SEASONAL_POWER_CHANGE_RANGE;
        const add = randomInteger(-(negRange * 10), posRange * 10) / 10;
        pl.power = round(pl.power + add, 1);
        if (pl.power > 9.9 || pl.power < 0.1) {
          console.error('Player Power out of range', pl.power, pl.nameEn, pl.clubNameEn);
        }
        const currPlayer = draft.currentPlayers.find(value => value.nameEn === pl.nameEn);
        if (!!currPlayer) {
          currPlayer.power = pl.power;
        }
      });
    });
    return newState;
  }),
  on(rotateClubs, (state, {clubNames, direction}: { clubNames: string[], direction: 'up' | 'down' }) => {
    console.log('Rotating', clubNames, direction);
    const newState = produce(state, (draft: CurrentGameState) => {
      const clubs: Club[] = draft.clubs.filter((cl: Club) => clubNames.includes(cl.nameEn) || clubNames.includes(cl.nameRu));
      const isCurrClubInvolved: boolean = !!clubNames.find(clubName => draft.currentClub.nameEn === clubName
        || draft.currentClub.nameRu === clubName);
      if (clubs.length !== clubNames.length) {
        console.error('Could not find all the clubs to rotate', clubNames, clubs);
      }
      const league = draft.leagues.find((l: League) => l.nameEn === clubs[0].leagueNameEn);
      let newLeague: League;
      if (direction === 'up') {
        newLeague = draft.leagues.find((l: League) => l.tier === league.tier + 1);
      }
      if (direction === 'down') {
        newLeague = draft.leagues.find((l: League) => l.tier === league.tier - 1);
      }
      if (!!newLeague) {
        clubs.forEach((cl: Club) => {
          cl.leagueNameEn = newLeague.nameEn;
          cl.leagueNameRu = newLeague.nameRu;
        });
        if (isCurrClubInvolved) {
          draft.currentClub.leagueNameEn = newLeague.nameEn;
          draft.currentClub.leagueNameRu = newLeague.nameRu;
        }
      }
    });
    return newState;
  }),
);

export function currentGameReducer(state: CurrentGameState, action: Action) {
  return _currentGameReducer(state, action);
}
