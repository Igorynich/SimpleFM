import {Club} from '../../interfaces/club';
import {Player} from '../../interfaces/player';
import {Action, createReducer, on} from '@ngrx/store';
import {getClub, gotBaseData, gotClub, gotPlayers, scheduleGenerated, updatePlayers} from '../actions/current-game.actions';
import {Country} from '../../interfaces/country';
import {League} from '../../interfaces/league';
import {WeekSchedule} from '../../interfaces/league-schedule';

export interface CurrentGameState {
  currentClub: Club;
  currentPlayers: Player[];
  data: {
    countries: Country[],
    leagues: League[],
    clubs: Club[],
    players: Player[]
  };
  loading: boolean;
  schedule: {[key: string]: WeekSchedule[][]};
}

export const currentGameInitState: CurrentGameState = {
  currentClub: null,
  currentPlayers: null,
  data: null,
  loading: true,
  schedule: null
};

const _currentGameReducer = createReducer(currentGameInitState,
  on(gotBaseData, (state, {countries, leagues, clubs, players}) => {
    console.log('gotBase Data', {
      ...state, data: {
        countries, leagues, clubs, players
      }});
    return {
      ...state, data: {
        countries, leagues, clubs, players
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
  })
);

export function currentGameReducer(state: CurrentGameState, action: Action) {
  return _currentGameReducer(state, action);
}
