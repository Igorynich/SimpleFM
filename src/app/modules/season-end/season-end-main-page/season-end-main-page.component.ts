import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SeasonService} from '../../../services/season.service';
import {LeagueTable} from '../../../interfaces/league-table';
import {combineLatest, Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {
  AppState,
  getClubsCupResultByClubsNameEn, getCurrentCountryLeagues,
  getLeagueByLeagueNameEn, getLeaguePlayersStats, selectClubByClubsName, selectClubByClubsNameEn, selectCupScheduleByCountryNameEn,
  selectCurrentClub,
  selectFinanceRecordsByClubsNameEn,
  selectLeagueTableByLeaguesNameEn, selectMatchById, selectMatchStatsByMatchId
} from '../../../store/selectors/current-game.selectors';
import {map, switchMap, take} from 'rxjs/operators';
import {Club} from '../../../interfaces/club';
import {League} from '../../../interfaces/league';
import {CupResult} from '../../../interfaces/cup-result';
import {FinanceRecord} from '../../../interfaces/finance-record';
import {last} from 'lodash';
import {UserService} from '../../../services/user.service';
import {WeekSchedule} from '../../../interfaces/league-schedule';
import {Match} from '../../../interfaces/match';
import {MatchStats} from '../../../interfaces/match-stats';
import {decideWinner} from '../../../utils/sort-roster';
import {Player} from '../../../interfaces/player';
import {Router} from '@angular/router';
import { ROUTES } from 'src/app/constants/routes';
import {MatchStats1} from '../../../interfaces/match-stats1';
import {ConfigService} from "../../../services/config.service";

@Component({
  selector: 'app-season-end-main-page',
  templateUrl: './season-end-main-page.component.html',
  styleUrls: ['./season-end-main-page.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class SeasonEndMainPageComponent implements OnInit {

  curClub$: Observable<Club>;
  displayedColumns1: string[] = ['position', 'clubName', 'games', 'wins', 'draws', 'loses', 'gf', 'ga', 'gd', 'points'];
  displayedColumns2: string[] = ['position', 'clubName', 'points'];
  playersCupPrizeMoney$: Observable<number>;
  playersLeaguePrizeMoney$: Observable<number>;
  playersCupResult$: Observable<CupResult>;
  playersLeague$: Observable<League>;
  playersLeagueTable$: Observable<LeagueTable[]>;
  selectedTab = 0;

  allLeagues$: Observable<League[]>;
  allLeagueTables$: Observable<LeagueTable[][]>;
  bestScorersForEachLeague$: Observable<BestScorers[]>;
  leagueWinner$: Observable<Club>;
  cupWinner$: Observable<Club>;

  ROUTES = ROUTES;

  constructor(private seasonService: SeasonService,
              private store: Store<AppState>,
              public userService: UserService,
              private router: Router,
              public config: ConfigService) {
  }

  ngOnInit(): void {
    this.seasonService.endCurrentSeason();
    this.curClub$ = this.store.select(selectCurrentClub).pipe(take(1));
    this.playersCupPrizeMoney$ = this.curClub$.pipe(switchMap((curClub: Club) =>
        this.store.select(selectFinanceRecordsByClubsNameEn, {clubsNameEn: curClub.nameEn}).pipe(take(1))),
      map((financeRecords: { [week: number]: FinanceRecord[] }) => {
        const lastWeek = last(Object.keys(financeRecords));
        const lastWeeksRecords: FinanceRecord[] = financeRecords[lastWeek];
        const cupPrizeRecord: FinanceRecord = lastWeeksRecords.find(value => value.description.includes('кубк'));   // lul
        return cupPrizeRecord.income;
      }));
    this.playersLeaguePrizeMoney$ = this.curClub$.pipe(switchMap((curClub: Club) =>
        this.store.select(selectFinanceRecordsByClubsNameEn, {clubsNameEn: curClub.nameEn})
          .pipe(take(1), map(value => [value, curClub]))),
      map(([financeRecords, curClub]: [{ [week: number]: FinanceRecord[] }, Club]) => {
        const lastWeek = last(Object.keys(financeRecords));
        const lastWeeksRecords: FinanceRecord[] = financeRecords[lastWeek];
        const cupPrizeRecord: FinanceRecord = lastWeeksRecords.find(value =>
          value.description.includes(curClub.leagueNameRu) || value.description.includes(curClub.leagueNameEn));   // lul
        return cupPrizeRecord.income;
      }));
    this.playersCupResult$ = this.curClub$.pipe(switchMap((curClub: Club) =>
      this.store.select(getClubsCupResultByClubsNameEn, {clubsNameEn: curClub.nameEn}).pipe(take(1))));
    this.playersLeague$ = this.curClub$.pipe(switchMap((curClub: Club) =>
      this.store.select(getLeagueByLeagueNameEn, {leaguesNameEn: curClub.leagueNameEn}).pipe(take(1))));
    this.playersLeagueTable$ = this.curClub$.pipe(switchMap((curClub: Club) =>
        this.store.select(selectLeagueTableByLeaguesNameEn, {leaguesNameEn: curClub.leagueNameEn}).pipe(take(1))),
      map((table: LeagueTable[]) => {

        return table;
      }));

    this.allLeagues$ = this.store.select(getCurrentCountryLeagues).pipe(take(1));

    this.allLeagueTables$ = this.allLeagues$.pipe(switchMap((leagues: League[]) => {
      const tableSelects$: Observable<LeagueTable[]>[] = leagues.map((l: League) =>
        this.store.select(selectLeagueTableByLeaguesNameEn, {leaguesNameEn: l.nameEn}));
      return combineLatest(tableSelects$).pipe(take(1));
    }));

    this.leagueWinner$ = this.store.select(getCurrentCountryLeagues).pipe(take(1), switchMap((leagues: League[]) => {
        const tierUnoLeague: League = leagues.find((l: League) => l.tier === 1);
        return this.store.select(selectLeagueTableByLeaguesNameEn, {leaguesNameEn: tierUnoLeague.nameEn}).pipe(take(1));
      }
    ), switchMap((tierUnoLeagueTable: LeagueTable[]) =>
      this.store.select(selectClubByClubsName, {clubsName: tierUnoLeagueTable[0].clubName}).pipe(take(1))));

    this.cupWinner$ = this.store.select(selectCupScheduleByCountryNameEn, {countryNameEn: null})
      .pipe(take(1), switchMap((cupSchedule: WeekSchedule[][]) => {
      const final: WeekSchedule = last(cupSchedule)[0];
      return combineLatest([
        this.store.select(selectMatchById, {matchId: final.matchId}),
        this.store.select(selectMatchStatsByMatchId, {matchId: final.matchId}),
        ]).pipe(take(1));
    }), switchMap(([match, stats]: [Match, MatchStats1]) => {
      const winner: 'home' | 'away' | 'draw' = decideWinner(stats.result);
      const clubsNameEn = winner === 'home' ? match.homeNameEn : match.awayNameEn;
      return this.store.select(selectClubByClubsName, {clubsName: clubsNameEn}).pipe(take(1));
      }));

    this.bestScorersForEachLeague$ = this.allLeagues$.pipe(switchMap((leagues: League[]) => {
      const playerStatsSelects$: Observable<Map<Player, { goals?: number, assists?: number, 'g+a'?: number }>>[] = leagues.map(l => {
        return this.store.select(getLeaguePlayersStats, {leagueName: l.nameEn});
      });
      // console.log('gettin player stats', leagues);
      return combineLatest(playerStatsSelects$).pipe(take(1));
    }), map((playersStatsArray: Map<Player, { goals?: number, assists?: number, 'g+a'?: number }>[]) => {
      const best: BestScorers[] = [];
      playersStatsArray.forEach((playerStats: Map<Player, {goals?: number, assists?: number, 'g+a'?: number}>) => {
        const sortedByGoals = [...playerStats.entries()].sort((a, b) => (b[1].goals || 0) - (a[1].goals || 0));
        const mostGoals: number = sortedByGoals[0] && sortedByGoals[0][1].goals;
        const bestScorers: Player[] = sortedByGoals.filter(([key, value]: [Player, {goals?: number, assists?: number, 'g+a'?: number}]) =>
          value.goals === mostGoals).map(([key, value]) => key);
        const goals = {q: mostGoals, players: bestScorers};
        const sortedByAssists = [...playerStats.entries()].sort((a, b) => (b[1].assists || 0) - (a[1].assists || 0));
        const mostAssists: number = sortedByAssists[0] && sortedByAssists[0][1].assists;
        const bestAssistants: Player[] = sortedByAssists.filter(([key, value]: [Player, {goals?: number, assists?: number, 'g+a'?: number}]) =>
          value.assists === mostAssists).map(([key, value]) => key);
        const assists = {q: mostAssists, players: bestAssistants};
        const sortedByGA = [...playerStats.entries()].sort((a, b) => (b[1]['g+a'] || 0) - (a[1]['g+a'] || 0));
        const mostGA: number = sortedByGA[0] && sortedByGA[0][1]['g+a'];
        const filteredGA = sortedByGA.filter(([key, value]: [Player, {goals?: number, assists?: number, 'g+a'?: number}]) =>
          value['g+a'] === mostGA);
        const bestGA: Player[] = filteredGA.map(([key, value]) => key);
        const sumGA: string[] = filteredGA.map(([key, value]) => `${value.goals}+${value.assists}`);
        const ga = {q: mostGA, players: bestGA, sum: sumGA};
        best.push({goals, assists, ga});
      });
      // console.warn('BEST', best);
      return best;
    }));
  }

  startNewSeason() {
    this.seasonService.startNewSeason();
    this.router.navigate([this.ROUTES.OFFICE]).catch(reason => {
      console.error(reason);
    });
  }

  isMyClubsTableRecord(element: LeagueTable, curClub: Club): boolean {
    return element.clubName === curClub.nameEn || element.clubName === curClub.nameRu;
  }
}

export interface BestScorers {
  goals: {q: number, players: Player[]};
  assists: {q: number, players: Player[]};
  ga: {q: number, players: Player[], sum: string[]};
}
