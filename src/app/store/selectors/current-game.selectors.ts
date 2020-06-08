import {CurrentGameState} from '../reducers/current-game.reducer';
import {createSelector} from '@ngrx/store';

export interface AppState {
  currentGame: CurrentGameState;
}

export const selectCurrentGameState = (state: AppState) => {
  console.log('FULL STATE', state);
  return state.currentGame;
};

export const selectCurrentClub = createSelector(selectCurrentGameState, (state: CurrentGameState) => state.currentClub);
export const selectCurrentPlayers = createSelector(selectCurrentGameState, (state: CurrentGameState) => state.currentPlayers);
export const curGameLoading = createSelector(selectCurrentGameState, (state: CurrentGameState) => state.loading);
