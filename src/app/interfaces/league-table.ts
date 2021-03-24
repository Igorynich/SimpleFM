import {Club} from './club';

export interface LeagueTable {
  position?: number;
  club: Club;
  games: number;
  wins: number;
  draws: number;
  loses: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
}
