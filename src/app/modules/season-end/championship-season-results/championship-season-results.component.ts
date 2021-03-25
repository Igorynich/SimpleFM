import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {
  AppState,
  getCurrentCountryLeagues,
  getLeaguePlayersStats,
  selectClubByClubsName,
  selectCupScheduleByCountryNameEn,
  selectCurrentClub,
  selectLeagueTableByLeaguesNameEn,
  selectMatchById,
  selectMatchStatsByMatchId
} from '../../../store/selectors/current-game.selectors';
import {ConfigService} from '../../../services/config.service';
import {map, switchMap, take} from 'rxjs/operators';
import {League} from '../../../interfaces/league';
import {LeagueTable} from '../../../interfaces/league-table';
import {WeekSchedule} from '../../../interfaces/league-schedule';
import {combineLatest, Observable} from 'rxjs';
import {Match} from '../../../interfaces/match';
import {MatchStats1} from '../../../interfaces/match-stats1';
import {decideWinner} from '../../../utils/sort-roster';
import {last} from 'lodash';
import {Club} from '../../../interfaces/club';
import {Player} from '../../../interfaces/player';

@Component({
  selector: 'app-championship-season-results',
  templateUrl: './championship-season-results.component.html',
  styleUrls: ['./championship-season-results.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChampionshipSeasonResultsComponent implements OnInit {

  allLeagues$: Observable<League[]>;
  allLeagueTables$: Observable<LeagueTable[][]>;
  bestScorersForEachLeague$: Observable<BestScorers[]>;
  cupWinner$: Observable<Club>;
  curClub$: Observable<Club>;
  displayedColumns2: string[] = ['position', 'clubName', 'points'];
  leagueWinner$: Observable<Club>;

  constructor(private store: Store<AppState>,
              public config: ConfigService) { }

  ngOnInit(): void {
    this.curClub$ = this.store.select(selectCurrentClub).pipe(take(1));
    this.leagueWinner$ = this.store.select(getCurrentCountryLeagues).pipe(take(1), switchMap((leagues: League[]) => {
          const tierUnoLeague: League = leagues.find((l: League) => l.tier === 1);
          return this.store.select(selectLeagueTableByLeaguesNameEn, {leaguesNameEn: tierUnoLeague.nameEn}).pipe(take(1));
        }
    ), switchMap((tierUnoLeagueTable: LeagueTable[]) =>
        this.store.select(selectClubByClubsName, {clubsName: tierUnoLeagueTable[0].club.nameEn}).pipe(take(1))));

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

    this.allLeagues$ = this.store.select(getCurrentCountryLeagues).pipe(take(1));

    this.allLeagueTables$ = this.allLeagues$.pipe(switchMap((leagues: League[]) => {
      const tableSelects$: Observable<LeagueTable[]>[] = leagues.map((l: League) =>
          this.store.select(selectLeagueTableByLeaguesNameEn, {leaguesNameEn: l.nameEn}));
      return combineLatest(tableSelects$).pipe(take(1));
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
        const bestAssistants: Player[] = sortedByAssists.
        filter(([key, value]: [Player, {goals?: number, assists?: number, 'g+a'?: number}]) =>
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

  isMyClubsTableRecord(element: LeagueTable, curClub: Club): boolean {
    return element.club.nameEn === curClub.nameEn;
  }
}

export interface BestScorers {
  goals: {q: number, players: Player[]};
  assists: {q: number, players: Player[]};
  ga: {q: number, players: Player[], sum: string[]};
}
