import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {
  AppState, selectClubByClubsNameEn,
  selectCurrentClub, selectMatchStatsByMatchId,
  selectScheduleByClubsNameEn
} from '../../../store/selectors/current-game.selectors';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {Club} from '../../../interfaces/club';
import {combineLatest, Observable, of} from 'rxjs';
import {Match} from '../../../interfaces/match';
import {resultSplitter} from '../../../utils/sort-roster';
import {MatchStats} from '../../../interfaces/match-stats';
import {MatchStats1} from '../../../interfaces/match-stats1';
import {Match1} from '../../../interfaces/match1';

@Component({
  selector: 'app-schedule-main-page',
  templateUrl: './schedule-main-page.component.html',
  styleUrls: ['./schedule-main-page.component.css']
})
export class ScheduleMainPageComponent implements OnInit {

  currentClub: Club;
  curClubsSchedule$: Observable<Match[]>;
  cupScheduleStats: { [matchId: number]: MatchStats1 };

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.curClubsSchedule$ = this.store.select(selectCurrentClub).pipe(tap(x => this.currentClub = x), switchMap(curClub =>
      this.store.select(selectScheduleByClubsNameEn, {clubsNameEn: curClub.nameEn})), map(schedule => {
      return schedule;
    }));

    this.curClubsSchedule$.pipe(take(1), switchMap((schedule: Match[]) => {
      console.log('schedule', schedule);
      const arr$: Observable<MatchStats1>[] = schedule.map((match: Match) => match ?
        this.store.select(selectMatchStatsByMatchId, {matchId: match.id}).pipe(take(1)) : of(null));
      return combineLatest(arr$).pipe(take(1), map((value: MatchStats1[]) => {
        console.log('STATS', value);
        const res = value.reduce((previousValue, currentValue) => {
            if (currentValue) {
              return {...previousValue, [currentValue.matchId]: currentValue};
            }
            return previousValue;
          }, {});
        console.log('STATS1', res);
        return res;
      }));
    })).subscribe(value => this.cupScheduleStats = value);
  }

  getMatchStats(match: Match): Observable<MatchStats1> {
    return this.store.select(selectMatchStatsByMatchId, {matchId: match.id});
  }

  getMatchOpponent(match: Match): { club: Observable<Club>, field: 'H' | 'A' } {
    if (!match) {
      return null;
    }
    if (!match.awayNameEn || !match.homeNameEn) {
      return {
        club: of(null),
        field: null
      };
    }
    // this.store.select(selectClubByClubsNameEn, {clubsNameEn: match.awayNameEn});
    return {
      club: match.homeNameEn === this.currentClub?.nameEn ?
        this.store.select(selectClubByClubsNameEn, {clubsNameEn: match.awayNameEn}) :
        this.store.select(selectClubByClubsNameEn, {clubsNameEn: match.homeNameEn}),
      field: match.homeNameEn === this.currentClub?.nameEn ? 'H' : 'A'
    };
  }

  getMatchResultClass(match: Match, stats: MatchStats1) {
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

  getAdjustResult(field: 'H' | 'A', matchStats: MatchStats1): string {
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
