import {createAction, props} from '@ngrx/store';
import {Club} from '../../interfaces/club';
import {Player} from '../../interfaces/player';
import {Country} from '../../interfaces/country';
import {League} from '../../interfaces/league';
import {LeagueTable} from '../../interfaces/league-table';
import {WeekSchedule} from '../../interfaces/league-schedule';
import {Match} from '../../interfaces/match';
import {CurrentGameState} from '../reducers/current-game.reducer';
import {Transfer} from '../../interfaces/transfer';

export const setUserName = createAction('Setting UserName', props<{userName: string}>());

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
export const advanceASeason = createAction('Go to next Season (clean up data)');

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
    awayAssists: {[minute: number]: Player}
  },
  result: string
}>());

export const addGainsAndLossesForMatch = createAction('Adds gainers and losers to match stats', props<{
  matchId: number,
  gains: Player[],
  losses: Player[]
}>());

export const updateTables = createAction('Updates tables with newly generated results');

export const addAttendanceForMatch = createAction('Adds attendance to match stats', props<{
  matchId: number,
  attendance: number
}>());

export const addFinanceRecord = createAction('Adds finance record', props<{clubNameEn, description, income, expense}>());

export const expandStadium = createAction('Expands stadium by {step} places', props<{step, cost}>());

export const playersListedOnTransfer = createAction('Players listed on transfer', props<{listedPlayers}>());

export const playerTransferToCurClub = createAction('Player being transferred', props<{player}>());

export const playerTransferToAClub = createAction('Player being sold to a club({clubsNameEn})',
  props<{player: Player, clubsNameEn: string}>());

export const newJobTaken = createAction('New job taken', props<{clubsNameEn: string}>());

export const oneMoreWeekOnCurrentJob = createAction('Adds one more week to weeksOnCurrentJob counter');

export const giveSeasonalPrizeMoney = createAction('Giving prize money when season ends');

export const seasonalChangeOfPlayersPowers = createAction('Changing players powers at season end');

export const makeDivisionRotations = createAction('Starting effect for division rotations');

export const rotateClubs = createAction('Clubs to rotate between divisions', props<{clubNames: string[], direction: 'up' | 'down'}>());

export const generateStuffForANewSeason = createAction('Starts generation of schedules, power ranks and stuff for next season');

export const cleanUpBeforeANewSeason = createAction('Cleans finances, gainsAndLosses, matches and stats before new season');

export const loadSavedGame = createAction('Loads saved store', props<{data: CurrentGameState}>());

export const loading = createAction('loading status', props<{status: boolean}>());

export const addTransferRecord = createAction('adds record to transfer list', props<{transfer: Transfer}>());
