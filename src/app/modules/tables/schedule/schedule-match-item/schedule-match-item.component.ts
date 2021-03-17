import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Match1} from '../../../../interfaces/match1';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Club} from '../../../../interfaces/club';
import {AppState, selectCurrentClub, selectMatchStatsByMatchId} from '../../../../store/selectors/current-game.selectors';
import {Store} from '@ngrx/store';
import {MatchStats1} from '../../../../interfaces/match-stats1';
import {Match} from '../../../../interfaces/match';

@Component({
  selector: 'app-schedule-match-item',
  templateUrl: './schedule-match-item.component.html',
  styleUrls: ['./schedule-match-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleMatchItemComponent implements OnInit {

  @Input() match: Match1;

  curClub$: Observable<Club>;
  matchStats$: Observable<MatchStats1>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.curClub$ = this.store.select(selectCurrentClub);
    this.matchStats$ = this.store.select(selectMatchStatsByMatchId, {matchId: this.match.id});
  }

  isMyClub$(match: Match1): { home: Observable<boolean>, away: Observable<boolean> } {
    return {
      home: this.curClub$.pipe(map(value => value.nameEn === match.home?.nameEn)),
      away: this.curClub$.pipe(map(value => value.nameEn === match.away?.nameEn))
    };
  }

  match1ToMatch(match: Match1): Match {
    return {...match, homeNameEn: match.home.nameEn, awayNameEn: match.away.nameEn};
  }
}
