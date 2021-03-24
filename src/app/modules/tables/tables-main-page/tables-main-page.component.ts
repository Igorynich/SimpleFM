import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {
  AppState, getCupRoundsNum, getCurrentCountryLeagues, getLeaguePlayersStats,
  selectCupScheduleByLeaguesNameEn,
  selectCurrentClub, selectCurrentWeek,
  selectLeagueScheduleByLeaguesNameEn, selectLeagueTableByLeaguesNameEn
} from '../../../store/selectors/current-game.selectors';
import {distinctUntilChanged, map, startWith, switchMap, take, tap} from 'rxjs/operators';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {LeagueTable} from '../../../interfaces/league-table';
import {CleanSubscriptions} from '../../../utils/clean-subscriptions';
import {Club} from '../../../interfaces/club';
import {getLeagueWeek, leagueTourToWeek} from '../../../utils/sort-roster';
import {Match1} from '../../../interfaces/match1';
import {Player} from '../../../interfaces/player';
import {FormControl} from '@angular/forms';
import {League} from '../../../interfaces/league';
import {ConfigService} from '../../../services/config.service';

@CleanSubscriptions()
@Component({
  selector: 'app-tables-main-page',
  templateUrl: './tables-main-page.component.html',
  styleUrls: ['./tables-main-page.component.css']
})
export class TablesMainPageComponent implements OnInit, OnDestroy {

  schedule$: Observable<Match1[][]>;
  schedule: Match1[][];
  cupSchedule$: Observable<Match1[][]>;
  curClub$: Observable<Club>;
  selectedWeek = {
    num: 0,
    schedule: null
  };
  leagueOrCupTab = 0;
  table$: Observable<LeagueTable[]>;
  leaguePlayersStats$;
  // selectedLeagueTab;
  selectedLeagueName: FormControl;
  allLeagues$: Observable<League[]>;

  private _curWeekSub: Subscription;

  constructor(private store: Store<AppState>,
              public config: ConfigService) {
  }

  ngOnInit(): void {
    this.selectedLeagueName = new FormControl(undefined);
    this.curClub$ = this.store.select(selectCurrentClub).pipe(tap(x => {
      if (!this.selectedLeagueName?.value) {
        this.selectedLeagueName.setValue(x.leagueNameEn);
      }
    }));
    this.curClub$.pipe(take(1)).subscribe();    // to init selectedLeagueName value

    this.allLeagues$ = this.store.select(getCurrentCountryLeagues);
    this._curWeekSub =
      combineLatest([
        this.store.select(selectCurrentWeek),
        this.store.select(getCupRoundsNum)
      ]).pipe(take(1)).subscribe(([curWeek, cupRounds]) => {
        this.selectedWeek.num = getLeagueWeek(curWeek - 1, cupRounds);
      });

    const selectedLeagueValueChanged$ = this.selectedLeagueName.valueChanges
    // startWith needed cause schedule$, cupSchedule$ etc subscribe only after view init, which is later than ngOnInit,
    // so line 53 setValue does not trigger valueChange
      .pipe(distinctUntilChanged(), startWith(this.selectedLeagueName.value));

    this.schedule$ = selectedLeagueValueChanged$.pipe(switchMap(selectedLeagueNameEn =>
      this.store.select(selectLeagueScheduleByLeaguesNameEn, {leaguesNameEn: selectedLeagueNameEn})
        .pipe(tap((x: Match1[][]) => {
          this.schedule = x;
          this.selectedWeek.schedule = x[this.selectedWeek.num];
          console.log('League Schedule', x);
        }))));

    this.cupSchedule$ = selectedLeagueValueChanged$.pipe(switchMap(selectedLeagueNameEn =>
      this.store.select(selectCupScheduleByLeaguesNameEn, {leaguesNameEn: selectedLeagueNameEn})));

    this.table$ = selectedLeagueValueChanged$.pipe(switchMap(selectedLeagueNameEn => {
      console.log('Table$ selectedLeagueNameEn', selectedLeagueNameEn);
      return this.store.select(selectLeagueTableByLeaguesNameEn, {leaguesNameEn: selectedLeagueNameEn});
    }));

    this.leaguePlayersStats$ = selectedLeagueValueChanged$.pipe(switchMap(selectedLeagueNameEn =>
      this.store.select(getLeaguePlayersStats, {leagueName: selectedLeagueNameEn})
      .pipe(map((value: Map<Player, { goals?: number, assists?: number, 'g+a'?: number }>) => {
        // console.log('selectedLeagueTab', this.selectedLeagueTab, value);
        // const sortedEntries = [...value.entries()].sort((a, b) => b[1].goals - a[1].goals);
        return value;
      }))));

  }

  ngOnDestroy(): void {
  }

  setWeekTo(i: number) {
    this.selectedWeek = {
      num: i,
      schedule: this.schedule[i]
    };
  }

  leagueTourToWeek(tour: number): number {
    let cupRounds;
    this.store.select(getCupRoundsNum).pipe(take(1)).subscribe(value => cupRounds = value);
    return leagueTourToWeek(tour, cupRounds);
  }
}
