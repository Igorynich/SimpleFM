import {Component, OnDestroy, OnInit} from '@angular/core';
import {Match} from '../../interfaces/match';
import {Store} from '@ngrx/store';
import {AppState, selectCurrentClub, selectMatchStatsByMatchId} from '../../store/selectors/current-game.selectors';
import {MatchStats} from '../../interfaces/match-stats';
import {Observable, Subscription} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Club} from '../../interfaces/club';
import {CleanSubscriptions} from '../../utils/clean-subscriptions';

@CleanSubscriptions()
@Component({
  selector: 'app-match-tooltip',
  templateUrl: './match-tooltip.component.html',
  styleUrls: ['./match-tooltip.component.css']
})
export class MatchTooltipComponent implements OnInit, OnDestroy {

  curClub$: Observable<Club>;
  match: Match;
  matchStats$: Observable<MatchStats>;

  private _curClubSub: Subscription;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.matchStats$ = this.store.select(selectMatchStatsByMatchId, {matchId: this.match.id});
    this.curClub$ = this.store.select(selectCurrentClub);
  }

  ngOnDestroy(): void {
  }

  getObjKeys(obj: object) {
    return Object.keys(obj);
  }

  isMyClub$(match: Match): {home: Observable<boolean>, away: Observable<boolean>} {
    return {
      home: this.curClub$.pipe(map(value => value.nameEn === match.home.nameEn)),
      away: this.curClub$.pipe(map(value => value.nameEn === match.away.nameEn))
    };
  }
}
