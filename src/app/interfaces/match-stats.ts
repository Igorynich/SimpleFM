import {Player} from './player';

export interface MatchStats {
  matchId: number;
  homeRoster: string[];
  awayRoster: string[];
  homeGoals: {[minute: number]: string};
  homeAssists: {[minute: number]: string | null};
  awayGoals: {[minute: number]: string};
  awayAssists: {[minute: number]: string | null};
  attendance: number;
  result?: string;
}
