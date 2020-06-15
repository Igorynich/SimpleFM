import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState, selectCurrentClub, selectScheduleByLeaguesNameEn} from '../../../store/selectors/current-game.selectors';
import {switchMap, tap} from 'rxjs/operators';
import {WeekSchedule} from '../../../interfaces/league-schedule';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-tables-main-page',
  templateUrl: './tables-main-page.component.html',
  styleUrls: ['./tables-main-page.component.css']
})
export class TablesMainPageComponent implements OnInit {

  schedule$: Observable<WeekSchedule[][]>;
  schedule: WeekSchedule[][];
  selectedWeek = {
    num: 0,
    schedule: null
  };

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.schedule$ = this.store.select(selectCurrentClub).pipe(switchMap(curClub =>
      this.store.select(selectScheduleByLeaguesNameEn, {leaguesNameEn: curClub.leagueNameEn})
        .pipe(tap(x => {
          this.schedule = x;
          this.selectedWeek.schedule = x[this.selectedWeek.num];
          console.log('League Schedule', x);
        }))));
  }

  setWeekTo(i: number) {
    this.selectedWeek = {
      num: i,
      schedule: this.schedule[i]
    };
  }
}
