import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState, selectClubPowersByLeaguesNameEn, selectLeagueTableByLeaguesNameEn} from '../store/selectors/current-game.selectors';
import {Match} from '../interfaces/match';
import {withLatestFrom} from 'rxjs/operators';
import {LeagueTable} from '../interfaces/league-table';
import {Club} from '../interfaces/club';

@Injectable({
  providedIn: 'root'
})
export class BaseAttendanceGenService {

  readonly ATTENDANCE_SCALE = {
    4: {hg: 0.6, ag: 1.8},
    3: {hg: 0.7, ag: 1.6},
    2: {hg: 0.8, ag: 1.4},
    1: {hg: 0.9, ag: 1.2},
    0: {hg: 1, ag: 1},
    '-1': {hg: 1.2, ag: 0.9},
    '-2': {hg: 1.4, ag: 0.8},
    '-3': {hg: 1.6, ag: 0.7},
    '-4': {hg: 1.8, ag: 0.6}
  };

  readonly OK_RESULTS_STEPS = {
    4: 6,
    3: 4,
    2: 2,
    1: 1,
    0: 0,
    '-1': -1,
    '-2': -2,
    '-3': -4,
    '-4': -6
  };

  constructor(private store: Store<AppState>) { }

  generateAttendance(homePower: number, awayPower: number, result: string, match: Match): number {
    this.store.select(selectLeagueTableByLeaguesNameEn, {leaguesNameEn: match.home.leagueNameEn})
      .pipe(withLatestFrom(this.store.select(selectClubPowersByLeaguesNameEn, {leaguesNameEn: match.home.leagueNameEn})))
      .subscribe(([leagueTable, clubPowersArray]: [LeagueTable[], {club: Club, power: number}[]]) => {
        // use leaguePosition - powerPosition to generate attendance
    });
    return 0;
  }
}
