import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {
  AppState,
  selectCupScheduleByLeaguesNameEn,
  selectCurrentClub, selectCurrentWeek,
  selectLeagueScheduleByLeaguesNameEn, selectLeagueTableByLeaguesNameEn
} from '../../../store/selectors/current-game.selectors';
import {map, switchMap, tap} from 'rxjs/operators';
import {WeekSchedule} from '../../../interfaces/league-schedule';
import {Observable, Subscription} from 'rxjs';
import {LeagueTable} from '../../../interfaces/league-table';
import {CleanSubscriptions} from '../../../utils/clean-subscriptions';
import {Match} from '../../../interfaces/match';
import {Club} from '../../../interfaces/club';
import {CUP_INTERVAL} from '../../../constants/general';
import {getLeagueWeek} from '../../../utils/sort-roster';
import {Match1} from '../../../interfaces/match1';

@CleanSubscriptions()
@Component({
  selector: 'app-tables-main-page',
  templateUrl: './tables-main-page.component.html',
  styleUrls: ['./tables-main-page.component.css']
})
export class TablesMainPageComponent implements OnInit, OnDestroy {

  schedule$: Observable<Match1[][]>;
  schedule: Match1[][];
  cupSchedule$;
  curClub$: Observable<Club>;
  selectedWeek = {
    num: 0,
    schedule: null
  };
  isLeague = true;
  leagueOrCupTab = 0;
  table$: Observable<LeagueTable[]>;
  table: LeagueTable[];
  displayedColumns: string[] = ['position', 'clubName', 'games', 'wins', 'draws', 'loses', 'gf', 'ga', 'gd', 'points'];

  private _curWeekSub: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this._curWeekSub = this.store.select(selectCurrentWeek).subscribe(value => {
      this.selectedWeek.num = getLeagueWeek(value) - 1;
    });
    this.curClub$ = this.store.select(selectCurrentClub);
    this.schedule$ = this.curClub$.pipe(switchMap(curClub =>
      this.store.select(selectLeagueScheduleByLeaguesNameEn, {leaguesNameEn: curClub.leagueNameEn})
        .pipe(tap((x: Match1[][]) => {
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
    this.table$ = this.curClub$.pipe(switchMap(curClub => {
      console.log('Table$ curClub', curClub);
      return this.store.select(selectLeagueTableByLeaguesNameEn, {leaguesNameEn: curClub.leagueNameEn});
    }));
  }

  ngOnDestroy(): void {
  }

  setWeekTo(i: number) {
    this.selectedWeek = {
      num: i,
      schedule: this.schedule[i]
    };
  }

  isMyClub$(match: Match): {home: Observable<boolean>, away: Observable<boolean>} {
    return {
      home: this.curClub$.pipe(map(value => value.nameEn === match.homeNameEn)),
      away: this.curClub$.pipe(map(value => value.nameEn === match.awayNameEn))
    };
  }

  isMyClubsTableRecord(element: LeagueTable, curClub: Club): boolean {
    return element.clubName === curClub.nameEn || element.clubName === curClub.nameRu;
  }
}
