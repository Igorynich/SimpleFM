import {Club} from '../../interfaces/club';
import {Player} from '../../interfaces/player';
import {Action, createReducer, on} from '@ngrx/store';
import {
  addGoalScorersForMatch,
  addMatch,
  advanceAWeek,
  getClub,
  gotBaseData,
  gotClub,
  gotPlayers,
  scheduleGenerated, setABunchOfResult, setResult,
  tablesGenerated,
  updatePlayers
} from '../actions/current-game.actions';
import {Country} from '../../interfaces/country';
import {League} from '../../interfaces/league';
import {WeekSchedule} from '../../interfaces/league-schedule';
import {LeagueTable} from '../../interfaces/league-table';
import {CUP_INTERVAL} from '../../constants/general';
import {Match} from '../../interfaces/match';
import {MatchStats} from '../../interfaces/match-stats';

export interface CurrentGameState {
  currentWeek: number;
  currentClub: Club;
  currentPlayers: Player[];
  data: {
    countries: Country[],
    leagues: League[],
    clubs: Club[],
    players: Player[]
  };
  loading: boolean;
  matches: {[id: number]: Match};
  schedule: {[leagueId: string]: WeekSchedule[][]};
  stats: {[matchId: number]: MatchStats};
  tables: {[leagueId: string]: LeagueTable[]};
}

export const currentGameInitState: CurrentGameState = {
  currentWeek: 0,
  currentClub: null,
  currentPlayers: null,
  data: null,
  loading: true,
  matches: {},
  schedule: null,
  stats: {},
  tables: null
};

const _currentGameReducer = createReducer(currentGameInitState,
  on(gotBaseData, (state, {countries, leagues, clubs, players, scheduleShells}) => {
    console.log('gotBase Data', {
      ...state, data: {
        countries, leagues, clubs, players, scheduleShells
      }});
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
    console.log('scheduleGenerated', {...state, schedule});
    return {...state, schedule};
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
);

export function currentGameReducer(state: CurrentGameState, action: Action) {
  return _currentGameReducer(state, action);
}
