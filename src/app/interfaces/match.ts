import {Club} from './club';
import {League} from './league';

export interface Match {
  home: Club | null;            // change to nameEn
  away: Club | null;
  // result?: string;
  id: number;
  isCupMatch: boolean;
  tournament: League | {nameRu: string, nameEn: string};
  field?: 'STANDARD' | 'N';
}
