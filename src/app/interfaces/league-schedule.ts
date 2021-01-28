import {Club} from './club';

export interface LeagueSchedule {
  schedule: WeekSchedule[];
}

export interface WeekSchedule {
  // homeNameEn: Club | null;
  // awayNameEn: Club | null;
  // result?: string;
  matchId: number;
  // isCupMatch: boolean;
}
