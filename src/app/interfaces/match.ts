import {Club} from './club';
import {League} from './league';

export interface Match {
  homeNameEn: string;            // nameEn
  awayNameEn: string;
  // result?: string;
  id: number;
  isCupMatch: boolean;
  tournament: League | {nameRu: string, nameEn: string};
  field?: 'STANDARD' | 'N';
}
