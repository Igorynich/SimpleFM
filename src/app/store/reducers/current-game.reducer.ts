import {Club} from '../../interfaces/club';
import {Player} from '../../interfaces/player';
import {Action, createReducer, on} from '@ngrx/store';
import {getClub, gotClub, gotPlayers, updatePlayers} from '../actions/current-game.actions';

export interface CurrentGameState {
  currentClub: Club;
  currentPlayers: Player[];
  loading: boolean;
}

export const currentGameInitState: CurrentGameState = {
  currentClub: null,
  currentPlayers: null,
  loading: true
};

const _currentGameReducer = createReducer(currentGameInitState,
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
  })
);

export function currentGameReducer(state: CurrentGameState, action: Action) {
  return _currentGameReducer(state, action);
}
