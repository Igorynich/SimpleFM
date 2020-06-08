import {createAction, props} from '@ngrx/store';
import {Club} from '../../interfaces/club';
import {Player} from '../../interfaces/player';

export const getClub = createAction('[Initial] random club acquisition');
export const gotClub = createAction('[Initial] random club acquired', props<{club: Club}>());
export const getPlayers = createAction('[Initial] roster acquisition');
export const gotPlayers = createAction('[Initial] roster acquired', props<{players: Player[]}>());
export const updatePlayers = createAction('Roster has been modified', props<{newPlayers: Player[]}>());