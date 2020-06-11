import {Club} from './club';

export interface LeagueSchedule {
  schedule: WeekSchedule[];
}

export interface WeekSchedule {
  home: Club;
  away: Club;
  result?: string;
  matchId?: string;
}
