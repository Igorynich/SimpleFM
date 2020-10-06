import {Player} from './player';

export interface MatchStats {
  matchId: number;
  homeGoals: {[minute: number]: Player};
  homeAssists: {[minute: number]: Player};
  awayGoals: {[minute: number]: Player};
  awayAssists: {[minute: number]: Player};
  attendance: number;
}
