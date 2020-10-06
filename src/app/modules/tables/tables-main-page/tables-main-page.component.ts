import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {
  AppState,
  selectCupScheduleByLeaguesNameEn,
  selectCurrentClub,
  selectLeagueScheduleByLeaguesNameEn, selectLeagueTableByLeaguesNameEn
} from '../../../store/selectors/current-game.selectors';
import {map, switchMap, tap} from 'rxjs/operators';
import {WeekSchedule} from '../../../interfaces/league-schedule';
import {Observable} from 'rxjs';
import {LeagueTable} from '../../../interfaces/league-table';

@Component({
  selector: 'app-tables-main-page',
  templateUrl: './tables-main-page.component.html',
  styleUrls: ['./tables-main-page.component.css']
})
export class TablesMainPageComponent implements OnInit {

  schedule$: Observable<WeekSchedule[][]>;
  schedule: WeekSchedule[][];
  cupSchedule$;
  selectedWeek = {
    num: 0,
    schedule: null
  };
  isLeague = true;
  leagueOrCupTab = 0;
  table$: Observable<LeagueTable[]>;
  table: LeagueTable[];
  displayedColumns: string[] = ['position', 'clubName', 'games', 'wins', 'draws', 'loses', 'gf', 'ga', 'gd', 'points'];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.schedule$ = this.store.select(selectCurrentClub).pipe(switchMap(curClub =>
      this.store.select(selectLeagueScheduleByLeaguesNameEn, {leaguesNameEn: curClub.leagueNameEn})
        .pipe(tap(x => {
          this.schedule = x;
          this.selectedWeek.schedule = x[this.selectedWeek.num];
          console.log('League Schedule', x);
        }))));
    this.cupSchedule$ = this.store.select(selectCurrentClub).pipe(switchMap(curClub =>
      this.store.select(selectCupScheduleByLeaguesNameEn, {leaguesNameEn: curClub.leagueNameEn})
        .pipe(map(x => {
          const treeNode = [];

          console.log('Cup Schedule', x);
          return x;
        }))));
    this.table$ = this.store.select(selectCurrentClub).pipe(switchMap(curClub =>
      this.store.select(selectLeagueTableByLeaguesNameEn, {leaguesNameEn: curClub.leagueNameEn})));
  }

  setWeekTo(i: number) {
    this.selectedWeek = {
      num: i,
      schedule: this.schedule[i]
    };
  }
}
