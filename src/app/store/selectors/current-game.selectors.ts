import {CurrentGameState} from '../reducers/current-game.reducer';
import {createSelector} from '@ngrx/store';
import {WeekSchedule} from '../../interfaces/league-schedule';
import {CUP_INTERVAL} from '../../constants/general';
import {Match} from '../../interfaces/match';
import {sortClubsRoster} from '../../utils/sort-roster';
import {Player} from '../../interfaces/player';

export interface AppState {
  currentGame: CurrentGameState;
}

export const selectCurrentGameState = (state: AppState) => {
  // console.log('FULL STATE', state);
  return state.currentGame;
};


export const selectCurrentClub = createSelector(selectCurrentGameState, (state: CurrentGameState) => state.currentClub);
export const selectCurrentPlayers = createSelector(selectCurrentGameState, (state: CurrentGameState) => state.currentPlayers);
export const selectCurrentWeek = createSelector(selectCurrentGameState, (state: CurrentGameState) => state.currentWeek + 1);
export const curGameLoading = createSelector(selectCurrentGameState, (state: CurrentGameState) => state.loading);

export const getAllClubs = createSelector(selectCurrentGameState, (state: CurrentGameState) => state.data.clubs);
export const getAllLeagues = createSelector(selectCurrentGameState, (state: CurrentGameState) => state.data.leagues);
export const getAllCountries = createSelector(selectCurrentGameState, (state: CurrentGameState) => state.data.countries);

export const selectPlayersByClubsNameEn = createSelector(selectCurrentGameState, (state, {clubsNameEn}) => {
  const teamRoster: Player[] = state.data.players.filter(value => value.clubNameEn === clubsNameEn);
  return sortClubsRoster(teamRoster);
});

export const selectLeagueScheduleByLeaguesNameEn = createSelector(selectCurrentGameState, (state, {leaguesNameEn}) => {
  const league = state.data.leagues.find(value => value.nameEn === leaguesNameEn);
  return state.schedule[league.id].map((value: WeekSchedule[]) => value.map(value1 => state.matches[value1.matchId]));
});

export const selectCupScheduleByLeaguesNameEn = createSelector(selectCurrentGameState, (state, {leaguesNameEn}) => {
  const league = state.data.leagues.find(value => value.nameEn === leaguesNameEn);
  const country = state.data.countries.find(value => value.nameEn === league.countryNameEn);
  return state.schedule[country.id].map((value: WeekSchedule[]) => value.map(value1 => state.matches[value1.matchId]));
});

export const selectLeagueTableByLeaguesNameEn = createSelector(selectCurrentGameState, (state, {leaguesNameEn}) => {
  const league = state.data.leagues.find(value => value.nameEn === leaguesNameEn);
  return state.tables[league.id];
});

export const selectCurrentWeekSchedule = createSelector(selectCurrentGameState, state => {
  const curWeek = state.currentWeek;
  const curClub = state.currentClub;
  const league = state.data.leagues.find(value => value.nameEn === curClub.leagueNameEn);
  const country = state.data.countries.find(value => value.nameEn === league.countryNameEn);
  const countryLeagues = state.data.leagues.filter(value => value.countryNameEn === country.nameEn);
  const schedule = [];      // {matches: null, tournament: null};
  if (!!curWeek && curWeek % CUP_INTERVAL === 0) {
    schedule.push({
      tournament: {nameRu: `Кубок ${country.nameRu}`, nameEn: `Cup of ${country.nameEn}`},
      matches: state.schedule[country.id][(curWeek / CUP_INTERVAL) - 1].map(value => state.matches[value.matchId]),  // TODO check this shit
      stats: state.schedule[country.id][(curWeek / CUP_INTERVAL) - 1].map(value => state.stats[value.matchId])
    });
  } else {
    countryLeagues.forEach(value => {
      const leagueSchedule = state.schedule[value.id] ? state.schedule[value.id][curWeek] : null;
      if (leagueSchedule) {
        schedule.push({
          tournament: value,
          matches: leagueSchedule.map(value1 => state.matches[value1.matchId]),
          stats: leagueSchedule.map(value1 => state.stats[value1.matchId])
        });
      }
    });
  }
  return schedule;
});

export const selectScheduleByClubsNameEn = createSelector(selectCurrentGameState, (state, {clubsNameEn}) => {
  const club = state.data.clubs.find(value => value.nameEn === clubsNameEn);
  const league = state.data.leagues.find(value => value.nameEn === club.leagueNameEn);
  const country = state.data.countries.find(value => value.nameEn === league.countryNameEn);
  const leagueSchedule: WeekSchedule[][] = state.schedule[league.id];
  const clubsLeagueSchedule: WeekSchedule[] = leagueSchedule.map((value: WeekSchedule[]) => {
    return value.find(match => {
      const realMatch = state.matches[match.matchId];
      return realMatch.home.nameEn === club.nameEn || realMatch.away.nameEn === club.nameEn;
    });
  });
  const cupSchedule: WeekSchedule[][] = state.schedule[country.id];
  const clubsCupSchedule: WeekSchedule[] = cupSchedule.map((value: WeekSchedule[]) =>
    value.find(match => {
      const realMatch = state.matches[match.matchId];
      return realMatch.home?.nameEn === club.nameEn || realMatch.away?.nameEn === club.nameEn;
    }));
  console.log('clubsCupSchedule', clubsCupSchedule);
  clubsCupSchedule.forEach((value, index) => {
    clubsLeagueSchedule.splice(CUP_INTERVAL * (index + 1), 0, value);
  });
  return clubsLeagueSchedule.map(value => {
    // console.log('!!!!!selectScheduleByClubsNameEn', state.matches, value);
    return state.matches[value?.matchId];
  });
});

export const selectCupScheduleByCountryNameEn = createSelector(selectCurrentGameState, (state, {countryNameEn}) => {
  const country = state.data.countries.find(value => value.nameEn === countryNameEn);
  return state.schedule[country.id];
});

export const selectClubsByLeagueId = createSelector(selectCurrentGameState, (state, {leagueId}) => {
  const league = state.data.leagues.find(value => value.id === leagueId);
  return state.data.clubs.filter(value => value.leagueNameEn === league.nameEn) || [];
});

export const selectLeagueScheduleShellByNumberOfClubs = createSelector(selectCurrentGameState, (state, {numOfClubs}) => {
  return state.data.scheduleShells[`league_${numOfClubs}`];
});

export const selectNextOpponent = createSelector(selectCurrentGameState, selectScheduleByClubsNameEn,
  (state, clubsSchedule: Match[], {clubsNameEn}) => {
  const curWeek = state.currentWeek;
  const curClub = state.currentClub;
  const nextWeeksMatch = clubsSchedule[curWeek];
  const nextOpp = nextWeeksMatch.home.nameEn === curClub.nameEn ? nextWeeksMatch.away : nextWeeksMatch.home;
  const field = nextWeeksMatch.home.nameEn === curClub.nameEn ? 'H' : 'A';
  console.log('selectNextOpponent schedule', clubsSchedule);
  return {opponent: nextOpp, field};
});

export const selectMatchById = createSelector(selectCurrentGameState, (state, {matchId}) => {
  // console.log('selectMatchById', matchId, state.matches);
  return state.matches[matchId];
});
