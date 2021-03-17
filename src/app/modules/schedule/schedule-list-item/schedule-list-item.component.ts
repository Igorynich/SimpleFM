import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Match} from '../../../interfaces/match';
import {Club} from '../../../interfaces/club';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {
  AppState,
  selectClubByClubsNameEn,
  selectCurrentClub,
  selectMatchStatsByMatchId
} from '../../../store/selectors/current-game.selectors';
import {map, switchMap, take} from 'rxjs/operators';
import {MatchStats1} from '../../../interfaces/match-stats1';
import {resultSplitter} from '../../../utils/sort-roster';

@Component({
  selector: 'app-schedule-list-item',
  templateUrl: './schedule-list-item.component.html',
  styleUrls: ['./schedule-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleListItemComponent implements OnInit {

  @Input() match: Match;
  @Input() week: number;

  currentClub$: Observable<Club>;
  matchStats$: Observable<MatchStats1>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.currentClub$ =  this.store.select(selectCurrentClub)/*.pipe(take(1))*/;
    if (this.match?.id) {
      this.matchStats$ = this.store.select(selectMatchStatsByMatchId, {matchId: this.match.id});
    }
  }

  getMatchOpponent(match: Match): { club: Observable<Club>, field: Observable<'H' | 'A'> } {
    if (!match) {
      return null;
    }
    if (!match.awayNameEn || !match.homeNameEn) {
      return {
        club: of(null),
        field: null
      };
    }
    return {
      club: this.currentClub$.pipe(switchMap(curClub => {
        return match.homeNameEn === curClub.nameEn ?
          this.store.select(selectClubByClubsNameEn, {clubsNameEn: match.awayNameEn}) :
          this.store.select(selectClubByClubsNameEn, {clubsNameEn: match.homeNameEn});
      })),
      field: this.currentClub$.pipe(map(curClub => match.homeNameEn === curClub.nameEn ? 'H' : 'A'))
    };
  }

  getMatchResultClass(match: Match, stats: MatchStats1): Observable<{[className: string]: boolean}> {
    return this.currentClub$.pipe(map(curClub => {
      const isHomeMatch = match.homeNameEn === curClub.nameEn;
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
    }));
  }

  getAdjustedResult(field: 'H' | 'A', matchStats: MatchStats1): string {
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
