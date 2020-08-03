import {Club} from './club';

export interface LeagueSchedule {
  schedule: WeekSchedule[];
}

export interface WeekSchedule {
  home: Club | null;
  away: Club | null;
  result?: string;
  matchId?: string;
  isCupMatch: boolean;
}
