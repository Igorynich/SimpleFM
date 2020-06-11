import {createAction, props} from '@ngrx/store';
import {Club} from '../../interfaces/club';
import {Player} from '../../interfaces/player';
import {Country} from '../../interfaces/country';
import {League} from '../../interfaces/league';

export const getBaseData = createAction('[Initial] data read from Firebase(countries, leagues, clubs, players)');
export const gotBaseData = createAction('[Initial] data read successful', props<{countries: Country[], leagues: League[],
  clubs: Club[], players: Player[]}>());

export const getClub = createAction('[Initial] random club acquisition');
export const gotClub = createAction('[Initial] random club acquired', props<{club: Club}>());
export const getPlayers = createAction('[Initial] roster acquisition');
export const gotPlayers = createAction('[Initial] roster acquired', props<{players: Player[]}>());
export const updatePlayers = createAction('Roster has been modified', props<{newPlayers: Player[]}>());

export const scheduleGenerated = createAction('Schedule has been generated', props<{schedule: any}>());
