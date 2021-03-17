import {AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {
  AppState, getCupRoundsNum, getCurrentCountryLeagues, getLeaguePlayersStats,
  selectCupScheduleByLeaguesNameEn,
  selectCurrentClub, selectCurrentWeek,
  selectLeagueScheduleByLeaguesNameEn, selectLeagueTableByLeaguesNameEn, selectMatchStatsByMatchId
} from '../../../store/selectors/current-game.selectors';
import {concatMap, distinctUntilChanged, map, startWith, switchMap, take, tap} from 'rxjs/operators';
import {combineLatest, Observable, of, Subscription} from 'rxjs';
import {LeagueTable} from '../../../interfaces/league-table';
import {CleanSubscriptions} from '../../../utils/clean-subscriptions';
import {Match} from '../../../interfaces/match';
import {Club} from '../../../interfaces/club';
import {CUP_INTERVAL} from '../../../constants/general';
import {getLeagueWeek, leagueTourToWeek} from '../../../utils/sort-roster';
import {Match1} from '../../../interfaces/match1';
import {MatchStats} from '../../../interfaces/match-stats';
import {Player} from '../../../interfaces/player';
import {FormControl} from '@angular/forms';
import {League} from '../../../interfaces/league';
import {PlayersListDialogComponent} from '../../../shared/players-list-dialog/players-list-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatchStats1} from '../../../interfaces/match-stats1';

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
  cupScheduleStats: {[matchId: number]: MatchStats1};
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
  leaguePlayersStats$;
  // selectedLeagueTab;
  selectedLeagueName: FormControl;
  allLeagues$: Observable<League[]>;

  private _curWeekSub: Subscription;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.selectedLeagueName = new FormControl(undefined);
    this.curClub$ = this.store.select(selectCurrentClub).pipe(tap(x => {
      if (!this.selectedLeagueName?.value) {
        this.selectedLeagueName.setValue(x.leagueNameEn);
      }
    }));
    this.curClub$.pipe(take(1)).subscribe();

    this.allLeagues$ = this.store.select(getCurrentCountryLeagues);
    this._curWeekSub =
      combineLatest([
        this.store.select(selectCurrentWeek),
        this.store.select(getCupRoundsNum)
      ]).pipe(take(1)).subscribe(([curWeek, cupRounds]) => {
        this.selectedWeek.num = getLeagueWeek(curWeek - 1, cupRounds);
      });

    const selectedLeagueValueChanged$ = this.selectedLeagueName.valueChanges
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
    this.cupSchedule$.pipe(take(1), switchMap((schedule: Match1[][]) => {
      // console.log('schedule', schedule);
      const arr: Match1[] = schedule.reduce((previousValue, currentValue) => [...previousValue, ...currentValue], []);
      // console.log('arr', arr);
      const arr$: Observable<MatchStats1>[] = arr.map((match: Match1) =>
        this.store.select(selectMatchStatsByMatchId, {matchId: match.id}).pipe(take(1)));
      return combineLatest(arr$).pipe(take(1), map((value: MatchStats1[]) => {
        // console.log('STATS', value);
        const res = value.reduce((previousValue, currentValue) => {
          return {...previousValue, [currentValue.matchId]: currentValue};
        }, {});
        console.log('STATS1', res);
        return res;
      }));
    })).subscribe(value => this.cupScheduleStats = value);
    this.table$ = selectedLeagueValueChanged$.pipe(switchMap(selectedLeagueNameEn => {
      console.log('Table$ selectedLeagueNameEn', selectedLeagueNameEn);
      return this.store.select(selectLeagueTableByLeaguesNameEn, {leaguesNameEn: selectedLeagueNameEn});
    }));
    // this.table$.subscribe()
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

  getMatchStats(match: Match1): Observable<MatchStats1> {
    // return of(null);
    return this.store.select(selectMatchStatsByMatchId, {matchId: match.id});
  }

  isMyClub$(match: Match1): { home: Observable<boolean>, away: Observable<boolean> } {
    return {
      home: this.curClub$.pipe(map(value => value.nameEn === match.home?.nameEn)),
      away: this.curClub$.pipe(map(value => value.nameEn === match.away?.nameEn))
    };
  }

  isMyClubsTableRecord(element: LeagueTable, curClub: Club): boolean {
    return element.clubName === curClub.nameEn || element.clubName === curClub.nameRu;
  }

  match1ToMatch(match: Match1): Match {
    return {...match, homeNameEn: match.home.nameEn, awayNameEn: match.away.nameEn};
  }

  leagueTourToWeek(tour: number): number {
    let cupRounds;
    this.store.select(getCupRoundsNum).pipe(take(1)).subscribe(value => cupRounds = value);
    return leagueTourToWeek(tour, cupRounds);
  }

  cupRoundToWeek(round: number): number {
    return round * CUP_INTERVAL + 1;
  }

  compareByGoals(a, b) {
    return (b.value.goals || 0) - (a.value.goals || 0);
  }

  compareByAssists(a, b) {
    return (b.value.assists || 0) - (a.value.assists || 0);
  }

  compareByGP(a, b) {
    return (b.value['g+a'] || 0) - (a.value['g+a'] || 0);
  }

  showClubsRoster(clubName: string) {
    const dialogRef = this.dialog.open(PlayersListDialogComponent, {
      width: '500px',
      data: {clubName}
    });
  }
}
