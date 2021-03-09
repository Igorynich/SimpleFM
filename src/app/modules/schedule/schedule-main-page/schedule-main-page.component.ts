import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {
  AppState, selectClubByClubsNameEn,
  selectCurrentClub, selectMatchStatsByMatchId,
  selectScheduleByClubsNameEn
} from '../../../store/selectors/current-game.selectors';
import {map, switchMap, tap} from 'rxjs/operators';
import {Club} from '../../../interfaces/club';
import {combineLatest, Observable, of} from 'rxjs';
import {Match} from '../../../interfaces/match';
import {resultSplitter} from '../../../utils/sort-roster';
import {MatchStats} from '../../../interfaces/match-stats';

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
  }

  getMatchStats(match: Match): Observable<MatchStats> {
    return this.store.select(selectMatchStatsByMatchId, {matchId: match.id});
  }

  getMatchOpponent(match: Match): {club: Observable<Club>, field: 'H' | 'A'} {
    if (!match) { return null; }
    if (!match.awayNameEn || !match.homeNameEn) {
      return {
        club: of(null),
        field: null
      };
    }
    this.store.select(selectClubByClubsNameEn, {clubsNameEn: match.awayNameEn});
    return {
      club: match.homeNameEn === this.currentClub?.nameEn ?
        this.store.select(selectClubByClubsNameEn, {clubsNameEn: match.awayNameEn}) :
        this.store.select(selectClubByClubsNameEn, {clubsNameEn: match.homeNameEn}),
      field: match.homeNameEn === this.currentClub?.nameEn ? 'H' : 'A'
    };
  }

  getMatchResultClass(match: Match, stats: MatchStats) {
    const isHomeMatch = match.homeNameEn === this.currentClub?.nameEn;
    const resClass = {};
    if (stats?.result) {
      const [homeG, awayG] = resultSplitter(stats.result);
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

  getAdjustResult(field: 'H' | 'A', matchStats: MatchStats): string {
    if (!matchStats?.result) {
      return '';
    } else {
      if (field === 'A') {
        const [home, away] = resultSplitter(matchStats?.result);
        return `${away} - ${home}`;
      }
      return matchStats?.result;
    }
  }
}
