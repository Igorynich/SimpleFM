import {WeekSchedule} from './league-schedule';
import {League} from './league';
import {Match} from './match';
import {MatchStats} from './match-stats';

export interface CurrentWeekSchedule {
  matches: Match[];
  stats: MatchStats[];
  tournament: {nameRu: string, nameEn: string} | League;
}
