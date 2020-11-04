import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {
  AppState,
  selectCurrentClub,
  selectScheduleByClubsNameEn
} from '../../../store/selectors/current-game.selectors';
import {map, switchMap, tap} from 'rxjs/operators';
import {Club} from '../../../interfaces/club';
import {combineLatest, Observable} from 'rxjs';
import {Match} from '../../../interfaces/match';

@Component({
  selector: 'app-schedule-main-page',
  templateUrl: './schedule-main-page.component.html',
  styleUrls: ['./schedule-main-page.component.css']
})
export class ScheduleMainPageComponent implements OnInit {

  currentClub: Club;
  curClubsSchedule$: Observable<Match[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.curClubsSchedule$ = this.store.select(selectCurrentClub).pipe(tap(x => this.currentClub = x), switchMap(curClub =>
      this.store.select(selectScheduleByClubsNameEn, {clubsNameEn: curClub.nameEn})), map(schedule => {
      return schedule;
    }));
    this.curClubsSchedule$.subscribe(value => {
      console.log('Cur club schedule', value);
    });
  }

  getMatchOpponent(match: {home: Club | null, away: Club | null} | null): {club: Club, field: 'H' | 'A'} {
    if (!match) { return null; }
    if (!match.away || !match.home) {
      return {
        club: null,
        field: null
      };
    }
    return {
      club: match.home?.nameEn === this.currentClub?.nameEn ? match.away : match.home,
      field: match.home?.nameEn === this.currentClub?.nameEn ? 'H' : 'A'
    };
  }

  getMatchResultClass(match: Match) {
    const isHomeMatch = match.home?.nameEn === this.currentClub?.nameEn;
    const resClass = {};
    if (match.result) {
      const [homeG, awayG] = match.result.split(' - ').map(value => +value);
      if (homeG > awayG) {
        resClass['match-won'] = isHomeMatch;
      } else if (homeG < awayG) {
        resClass['match-won'] = !isHomeMatch;
      } else if (homeG === awayG) {
        resClass['match-draw'] = true;
      }
    }
    resClass['match-lost'] = !resClass['match-won'] && !resClass['match-draw'];
    return resClass;
  }
}
