import {Player} from './player';

export interface MatchStats {
  matchId: number;
  homeRoster: Player[],
  awayRoster: Player[],
  homeGoals: {[minute: number]: Player};
  homeAssists: {[minute: number]: Player | null};
  awayGoals: {[minute: number]: Player};
  awayAssists: {[minute: number]: Player | null};
  attendance: number;
}
