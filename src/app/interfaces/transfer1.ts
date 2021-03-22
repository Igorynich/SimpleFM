import {Player} from './player';
import {Club} from './club';

export interface Transfer1 {
  player: Player;
  fee: number;
  from: Club;
  to: Club;
  week: number;
  season: number;
}
