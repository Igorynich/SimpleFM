import {createAction, props} from '@ngrx/store';
import {Club} from '../../interfaces/club';
import {Player} from '../../interfaces/player';
import {Country} from '../../interfaces/country';
import {League} from '../../interfaces/league';
import {LeagueTable} from '../../interfaces/league-table';
import {WeekSchedule} from '../../interfaces/league-schedule';
import {Match} from '../../interfaces/match';

export const getBaseData = createAction('[Initial] data read from Firebase(countries, leagues, clubs, players)');
export const gotBaseData = createAction('[Initial] data read successful', props<{
  countries: Country[], leagues: League[],
  clubs: Club[], players: Player[], scheduleShells
}>());

export const getClub = createAction('[Initial] random club acquisition');
export const gotClub = createAction('[Initial] random club acquired', props<{ club: Club }>());
export const getPlayers = createAction('[Initial] roster acquisition');
export const gotPlayers = createAction('[Initial] roster acquired', props<{ players: Player[] }>());
export const updatePlayers = createAction('Roster has been modified', props<{ newPlayers: Player[] }>());

export const scheduleGenerated = createAction('Schedule has been generated', props<{ schedule: any }>());
export const tablesGenerated = createAction('Tables has been generated', props<{ tables: { [leagueId: string]: LeagueTable[] } }>());

export const advanceAWeek = createAction('Go to next Week');

export const logOut = createAction('Log Out');

export const addMatch = createAction('Add generated match to store', props<{ match: { [id: number]: Match } }>());
export const setResult = createAction('Set generated match result', props<{ result: string, match: WeekSchedule | Match }>());
export const setABunchOfResult = createAction('Set several generated match results',
  props<{ results: string[], matches: WeekSchedule[] | Match[] }>());

export const addGoalScorersForMatch = createAction('Adds goal scorers to match stats', props<{
  matchId: number,
  goals: {
    homeRoster: Player[],
    awayRoster: Player[],
    homeGoals: { [minute: number]: Player },
    homeAssists: {[minute: number]: Player},
    awayGoals: { [minute: number]: Player },
    awayAssists: {[minute: number]: Player};
  }
}>());

export const updateTables = createAction('Updates tables with newly generated results');
