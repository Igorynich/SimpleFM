import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState, selectCurrentClub, selectScheduleByClubsNameEn} from '../../../store/selectors/current-game.selectors';
import {switchMap, tap} from 'rxjs/operators';
import {Club} from '../../../interfaces/club';

@Component({
  selector: 'app-schedule-main-page',
  templateUrl: './schedule-main-page.component.html',
  styleUrls: ['./schedule-main-page.component.css']
})
export class ScheduleMainPageComponent implements OnInit {

  currentClub: Club;
  curClubsSchedule$;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.curClubsSchedule$ = this.store.select(selectCurrentClub).pipe(tap(x => this.currentClub = x), switchMap(curClub =>
      this.store.select(selectScheduleByClubsNameEn, {clubsNameEn: curClub.nameEn})));
    this.curClubsSchedule$.subscribe(value => {
      console.log('Cur club schedule', value);
    })
  }

  getMatchOpponent(match: {home: Club, away: Club}): {club: Club, field: 'H' | 'A'} {
    return {
      club: match.home.nameEn === this.currentClub.nameEn ? match.away : match.home,
      field: match.home.nameEn === this.currentClub.nameEn ? 'H' : 'A'
    };
  }

}
