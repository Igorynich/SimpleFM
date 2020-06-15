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

export const selectScheduleByLeaguesNameEn = createSelector(selectCurrentGameState, (state, {leaguesNameEn}) => {
  const league = state.data.leagues.find(value => value.nameEn === leaguesNameEn);
  return state.schedule[league.id];
});

export const selectScheduleByClubsNameEn = createSelector(selectCurrentGameState, (state, {clubsNameEn}) => {
  const club = state.data.clubs.find(value => value.nameEn === clubsNameEn);
  const league = state.data.leagues.find(value => value.nameEn === club.leagueNameEn);
  const leagueSchedule = state.schedule[league.id];
  return leagueSchedule.map(value => {
    return value.find(match => match.home.nameEn === club.nameEn || match.away.nameEn === club.nameEn);
  });
});
