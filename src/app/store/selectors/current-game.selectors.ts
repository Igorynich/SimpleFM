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

export const getAllClubs = createSelector(selectCurrentGameState, (state: CurrentGameState) => state.data.clubs);
export const getAllLeagues = createSelector(selectCurrentGameState, (state: CurrentGameState) => state.data.leagues);
export const getAllCountries = createSelector(selectCurrentGameState, (state: CurrentGameState) => state.data.countries);

export const selectPlayersByClubsNameEn = createSelector(selectCurrentGameState, (state, {clubsNameEn}) => {
  return state.data.players.filter(value => value.clubNameEn === clubsNameEn);
});
