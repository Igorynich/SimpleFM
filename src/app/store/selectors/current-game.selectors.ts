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

export const selectLeagueScheduleByLeaguesNameEn = createSelector(selectCurrentGameState, (state, {leaguesNameEn}) => {
  const league = state.data.leagues.find(value => value.nameEn === leaguesNameEn);
  return state.schedule[league.id];
});

export const selectCupScheduleByLeaguesNameEn = createSelector(selectCurrentGameState, (state, {leaguesNameEn}) => {
  const league = state.data.leagues.find(value => value.nameEn === leaguesNameEn);
  const country = state.data.countries.find(value => value.nameEn === league.countryNameEn);
  return state.schedule[country.id];
});

export const selectScheduleByClubsNameEn = createSelector(selectCurrentGameState, (state, {clubsNameEn}) => {
  const club = state.data.clubs.find(value => value.nameEn === clubsNameEn);
  const league = state.data.leagues.find(value => value.nameEn === club.leagueNameEn);
  const country = state.data.countries.find(value => value.nameEn === league.countryNameEn);
  const leagueSchedule = state.schedule[league.id];
  const clubsLeagueSchedule = leagueSchedule.map(value => {
    return value.find(match => match.home.nameEn === club.nameEn || match.away.nameEn === club.nameEn);
  });
  const cupSchedule = state.schedule[country.id];
  const clubsCupSchedule = cupSchedule.map(value =>
    value.find(match => match.home?.nameEn === club.nameEn || match.away?.nameEn === club.nameEn));
  console.log('clubsCupSchedule', clubsCupSchedule);
  clubsCupSchedule.forEach((value, index) => {
    clubsLeagueSchedule.splice(5 * (index + 1), 0, value);
  });
  return clubsLeagueSchedule;
});

export const selectCupScheduleByCountryNameEn = createSelector(selectCurrentGameState, (state, {countryNameEn}) => {
  const country = state.data.countries.find(value => value.nameEn === countryNameEn);
  return state.schedule[country.id];
});

export const selectLeagueScheduleShellByNumberOfClubs = createSelector(selectCurrentGameState, (state, {numOfClubs}) => {
  return state.data.scheduleShells[`league_${numOfClubs}`];
});
