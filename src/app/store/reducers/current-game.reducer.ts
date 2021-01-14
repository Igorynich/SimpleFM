import {Club} from '../../interfaces/club';
import {Player} from '../../interfaces/player';
import {Action, createReducer, on} from '@ngrx/store';
import {
  addAttendanceForMatch, addFinanceRecord,
  addGainsAndLossesForMatch,
  addGoalScorersForMatch,
  addMatch,
  advanceAWeek,
  getClub,
  gotBaseData,
  gotClub,
  gotPlayers, logOut,
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
import {resultSplitter, sortClubsRoster, sortStarters} from '../../utils/sort-roster';
import {round} from 'lodash';
import {closest} from '../../utils/helpers';
import {FinanceRecord} from '../../interfaces/finance-record';

export interface CurrentGameState {
  currentWeek: number;
  currentClub: Club;
  currentPlayers: Player[];
  data: {     // loaded from b/e
    countries: Country[],
    leagues: League[],
    clubs: Club[],
    players: Player[]
  };
  finances: Map<string, {[week: number]: FinanceRecord[]}>;      // {[week: number]: Map<string, FinanceRecord[]>};
  gainsAndLosses: {[matchId: number]: {gains: Player[], losses: Player[]}};
  loading: boolean;
  matches: { [id: number]: Match };
  schedule: { [leagueId: string]: WeekSchedule[][] };
  seasonData: {       // calculated at season start
    clubPowers: Map<string, number>       // <clubNameEn, power>    power - sum rank of starters
    ticketPrices: Map<string, number>       // <clubNameEn, ticketPrice>
  };
  stats: { [matchId: number]: MatchStats };
  tables: { [leagueId: string]: LeagueTable[] };
}

export const currentGameInitState: CurrentGameState = {
  currentWeek: 0,
  currentClub: null,
  currentPlayers: null,
  data: null,
  finances: null,
  gainsAndLosses: null,
  loading: true,
  matches: {},
  schedule: null,
  seasonData: {
    clubPowers: null,
    ticketPrices: null
  },
  stats: {},
  tables: null
};

const _currentGameReducer = createReducer(currentGameInitState,
  on(gotBaseData, (state, {countries, leagues, clubs, players, scheduleShells}) => {
    console.log('gotBase Data', {
      ...state, data: {
        countries, leagues, clubs, players, scheduleShells
      }
    });
    return {
      ...state, data: {
        countries, leagues, clubs, players, scheduleShells
      }
    };
  }),
  on(gotClub, (state, {club}) => {
    console.log('gotClub', {...state, currentClub: club});
    return {...state, currentClub: club};
  }),
  on(gotPlayers, (state, {players}) => {
    console.log('gotPlayers', {...state, currentPlayers: players});
    return {...state, currentPlayers: players, loading: false};
  }),
  on(updatePlayers, (state, {newPlayers}) => {
    console.log('updatePlayers', {...state, currentPlayers: newPlayers});
    return {...state, currentPlayers: newPlayers};
  }),
  on(scheduleGenerated, (state, {schedule}) => {
    // filling clubsPowers
    let map = new Map<string, number>();
    state.data.clubs.forEach((club: Club) => {
      const roster = state.data.players.filter((pl: Player) => pl.clubNameEn === club.nameEn);
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
    console.log('scheduleGenerated', {...state, schedule, seasonData: {clubPowers: map, ticketPrices}});
    return {...state, schedule, seasonData: {clubPowers: map, ticketPrices}};
  }),
  on(tablesGenerated, (state, {tables}) => {
    console.log('tablesGenerated', {...state, tables});
    return {...state, tables};
  }),
  on(advanceAWeek, state => {
    console.log('advanceAWeek', {...state, currentWeek: state.currentWeek + 1});
    return {...state, currentWeek: state.currentWeek + 1};
  }),
  on(addMatch, (state, {match}) => {
    // console.log('addMatch', match); // {...state, matches: {...state.matches, ...match}});
    return {...state, matches: {...state.matches, ...match}};
  }),
  on(addFinanceRecord, (state, {clubNameEn, description, expense, income}) => {
    const map = new Map<string, {[week: number]: FinanceRecord[]}>();
    const week = state.currentWeek;
    const finances = state.finances ? new Map(state.finances) : map;
    const clubsRecords: {[week: number]: FinanceRecord[]} = finances && finances.get(clubNameEn);
    if (!!clubsRecords) {
      clubsRecords[week] ? clubsRecords[week].push({description, expense, income}) : clubsRecords[week] = [{description, expense, income}];
      finances.set(clubNameEn, clubsRecords);
    } else {
      finances.set(clubNameEn, {[week]: [{description, expense, income}]});
    }
    return {...state, finances};
  }),
  on(setResult, (state, {result, match}) => {
    console.log('Setting Result', result, match);
    let matchId;
    if ('matchId' in match) {       // match is WeekSchedule
      matchId = match.matchId;
    } else {                        // match is Match
      matchId = match.id;
    }
    console.log('setResult', {...state, matches: {...state.matches, matchId: {...state.matches[matchId], result}}});
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
    console.log('setResult', {...state, matches: {...state.matches, ...matchesWithAddedResults}});
    return {...state, matches: {...state.matches, ...matchesWithAddedResults}};
    // return {...state};
  }),
  on(addGoalScorersForMatch, (state, {matchId, goals}) => {
    console.log('addGoalScorersForMatch', {...state, stats: {...state.stats, [matchId]: {...state.stats[matchId], ...goals}}});
    return {...state, stats: {...state.stats, [matchId]: {...state.stats[matchId], ...goals}}};
  }),
  on(addGainsAndLossesForMatch, (state, {matchId, gains, losses}) => {
    const changedPlayers = [];
    // TODO think of better solution - maybe use immer
    state.data.players.forEach(pl => {
      changedPlayers.push({...pl});
    });
    //
    const currentPlayers = [];
    state.currentPlayers.forEach(pl => {
      currentPlayers.push({...pl});
    });
    losses.forEach((pl: Player) => {
      const dataPlayer = changedPlayers.find(value => value.nameEn === pl.nameEn);
      console.log('Losses Player', pl, dataPlayer);
      if (dataPlayer) {
        if (dataPlayer.power > 0.1) {     // cant be less than 0.1
          dataPlayer.power = round(dataPlayer.power - 0.1, 1);
          if (!dataPlayer.gain) {
            dataPlayer.gain = 0;
          }
          dataPlayer.gain = round(dataPlayer.gain - 0.1, 1);
          console.log('Losses Player -0.1', dataPlayer);
        }
      }
      // TODO updating current players - think of another solution - like updateCurrentPlayers action
      const curPlayer = currentPlayers.find(value => value.nameEn === pl.nameEn);
      console.log('Losses cur Player', pl, curPlayer);
      if (curPlayer) {
        if (curPlayer.power > 0.1) {
          curPlayer.power = round(curPlayer.power - 0.1, 1);
          if (!curPlayer.gain) {
            curPlayer.gain = 0;
          }
          curPlayer.gain = round(curPlayer.gain - 0.1, 1);
          console.log('Losses Player -0.1', curPlayer);
        }
      }
    });
    gains.forEach((pl: Player) => {
      const dataPlayer = changedPlayers.find(value => value.nameEn === pl.nameEn);
      if (dataPlayer) {
        if (dataPlayer.power < 10) {
          dataPlayer.power = round(dataPlayer.power + 0.1, 1);
          if (!dataPlayer.gain) {
            dataPlayer.gain = 0;
          }
          dataPlayer.gain = round(dataPlayer.gain + 0.1, 1);
        }
      }
      // TODO updating current players - think of another solution - like updateCurrentPlayers action
      const curPlayer = currentPlayers.find(value => value.nameEn === pl.nameEn);
      if (curPlayer) {
        if (curPlayer.power < 10) {
          curPlayer.power = round(curPlayer.power + 0.1, 1);
          if (!curPlayer.gain) {
            curPlayer.gain = 0;
          }
          curPlayer.gain = round(curPlayer.gain + 0.1, 1);
        }
      }
    });
    console.warn('addGainsAndLossesForMatch', {
      ...state,
      currentPlayers,
      gainsAndLosses: {...state.gainsAndLosses, [matchId]: {gains, losses}},
      data: {...state.data, players: changedPlayers}
    });
    return {
      ...state,
      currentPlayers,
      gainsAndLosses: {...state.gainsAndLosses, [matchId]: {gains, losses}},
      data: {...state.data, players: changedPlayers}
    };
  }),
  on(addAttendanceForMatch, (state, {matchId, attendance}) => {
    console.log('addAttendanceForMatch', {
      ...state,
      stats: {...state.stats, [matchId]: {...state.stats[matchId], attendance}}
    });
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
    const curWeek = state.currentWeek;
    let newState = state;
    if (!!curWeek && curWeek % CUP_INTERVAL === 0) {     // cup
      console.warn('UpdateTables for CUP', curWeek);
      const curClub = state.currentClub;
      const league = state.data.leagues.find(value => value.nameEn === curClub.leagueNameEn);
      const country = state.data.countries.find(value => value.nameEn === league.countryNameEn);
      const cupRound = (curWeek / CUP_INTERVAL) - 1;
      const cupSchedule: WeekSchedule[] = state.schedule[country.id][cupRound];
      const cupScheduleNext: WeekSchedule[] = state.schedule[country.id][cupRound + 1];
      const cupMatches: Match[] = cupSchedule.map(value => state.matches[value.matchId]);
      const cupMatchesNext: Match[] = cupScheduleNext.map(value => state.matches[value.matchId]);
      const newSchedule: WeekSchedule[][] = [...state.schedule[country.id]];
      newSchedule[cupRound + 1] = [];       // обнуляем след раунд
      const newMatches: { [id: number]: Match } = {};
      let nextRoundMatch: Match = {
        away: undefined,
        home: undefined,
        id: undefined,
        tournament: {nameRu: `Кубок ${country.nameRu}`, nameEn: `Cup of ${country.nameEn}`},
        isCupMatch: true
      };
      cupMatches.forEach((match: Match, index) => {
        console.log(`Match ${index}`, match);
        if (1) {
          const newId = (+Object.keys(newState.matches)[Object.keys(newState.matches).length - 1]) + 1;
          const nextRoundMatchIndex = Math.floor(index / 2);
          let isHomeAWinner = !!match.home;
          if (match.result) {
            const [homeScore, awayScore] = match.result.split(' - ');
            const [homeGoals, awayGoals] = resultSplitter(match.result);
            isHomeAWinner = homeScore.includes('e') || homeScore.includes('p') || homeGoals > awayGoals;
          }
          const nextId = cupScheduleNext[nextRoundMatchIndex]?.matchId ? cupScheduleNext[nextRoundMatchIndex].matchId : newId;
          if (index % 2 === 0) {      // first match (decides home for next)
            nextRoundMatch.home = isHomeAWinner ? match.home : match.away;
          }
          if (index % 2 === 1) {      // second match (decides away for next)
            nextRoundMatch.away = isHomeAWinner ? match.home : match.away;
            nextRoundMatch.id = nextId;
            newSchedule[cupRound + 1] = [...newSchedule[cupRound + 1], {matchId: nextRoundMatch.id}];
            newMatches[nextRoundMatch.id] = nextRoundMatch;
            console.log('newSchedule', newSchedule);
            console.log('newMatches', newMatches);
            nextRoundMatch = {      // reset
              away: undefined,
              home: undefined,
              id: undefined,
              tournament: {nameRu: `Кубок ${country.nameRu}`, nameEn: `Cup of ${country.nameEn}`},
              isCupMatch: true
            };
          }
        }
        newState = {...state, matches: {...state.matches, ...newMatches}, schedule: {...state.schedule, [country.id]: newSchedule}};
        console.log('newState', newState);
      });

    } else {                                // league
      const leagues: League[] = state.data.leagues;
      const newTables = {...state.tables};
      leagues.forEach((league: League) => {
        console.warn('League', league);
        const tableRecords: LeagueTable[] = state.tables[league.id] ? [...state.tables[league.id]] : [];
        const schedule: WeekSchedule[] = state.schedule[league.id] ? state.schedule[league.id][curWeek] : [];
        const matches: Match[] = schedule.map((value: WeekSchedule) => state.matches[value.matchId]);
        console.warn('MatchES', matches);
        let newTableRecords = [];
        matches.forEach((match: Match) => {
          console.warn('Match', match);
          if (match.result && !match.isCupMatch) {      // если есть result и матч не кубковый
            const homeRecord: LeagueTable = tableRecords.find(record =>
              match.home.nameEn === record.clubName || match.home.nameRu === record.clubName);
            const awayRecord: LeagueTable = tableRecords.find(record =>
              match.away.nameEn === record.clubName || match.away.nameRu === record.clubName);
            console.log('homeRecord - awayRecord', homeRecord, awayRecord);
            if (homeRecord && awayRecord) {
              const homeRecordCopy = {...homeRecord};
              const awayRecordCopy = {...awayRecord};
              const [homeGoals, awayGoals] = resultSplitter(match.result);
              if (homeGoals > awayGoals) {
                homeRecordCopy.wins++;
                awayRecordCopy.loses++;
                homeRecordCopy.points += 3;
              } else if (homeGoals < awayGoals) {
                homeRecordCopy.loses++;
                awayRecordCopy.wins++;
                awayRecordCopy.points += 3;
              } else if (homeGoals === awayGoals) {
                homeRecordCopy.draws++;
                awayRecordCopy.draws++;
                homeRecordCopy.points += 1;
                awayRecordCopy.points += 1;
              }
              homeRecordCopy.gf += homeGoals;
              homeRecordCopy.ga += awayGoals;
              awayRecordCopy.gf += awayGoals;
              awayRecordCopy.ga += homeGoals;
              homeRecordCopy.games++;
              awayRecordCopy.games++;
              homeRecordCopy.gd = homeRecordCopy.gf - homeRecordCopy.ga;
              awayRecordCopy.gd = awayRecordCopy.gf - awayRecordCopy.ga;
              newTableRecords = [...newTableRecords, homeRecordCopy, awayRecordCopy];
            }
            newTables[league.id] = newTableRecords;
            newState = {...state, tables: newTables};
          }
        });
      });
    }

    console.log('UpdatingTables', curWeek, newState);
    return newState;
  })
);

export function currentGameReducer(state: CurrentGameState, action: Action) {
  return _currentGameReducer(state, action);
}
