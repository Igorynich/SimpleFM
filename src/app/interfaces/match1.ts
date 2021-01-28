import {League} from './league';
import {Club} from './club';

export interface Match1 {
  home: Club;
  away: Club;
  id: number;
  isCupMatch: boolean;
  tournament: League | {nameRu: string, nameEn: string};
  field?: 'STANDARD' | 'N';
}
