import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Match1} from '../../../../interfaces/match1';
import {Match} from '../../../../interfaces/match';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Club} from '../../../../interfaces/club';
import {Store} from '@ngrx/store';
import {AppState, selectCurrentClub, selectMatchStatsByMatchId} from '../../../../store/selectors/current-game.selectors';
import {MatchStats1} from '../../../../interfaces/match-stats1';
import {ConfigService} from '../../../../services/config.service';

@Component({
  selector: 'app-cup-match-item',
  templateUrl: './cup-match-item.component.html',
  styleUrls: ['./cup-match-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CupMatchItemComponent implements OnInit {

  @Input() match: Match1;
  @Input() roundIndex = 0;
  @Input() numOfRounds;
  @Input() matchIndex = 0;

  curClub$: Observable<Club>;
  matchStats$: Observable<MatchStats1>;

  readonly BASE_WIDTH_REM = 6;

  constructor(private store: Store<AppState>,
              public config: ConfigService) { }

  ngOnInit(): void {
    this.curClub$ = this.store.select(selectCurrentClub);
    this.matchStats$ = this.store.select(selectMatchStatsByMatchId, {matchId: this.match.id});
  }

  match1ToMatch(match: Match1): Match {
    return {...match, homeNameEn: match.home.nameEn, awayNameEn: match.away.nameEn};
  }

  isMyClub$(match: Match1): { home: Observable<boolean>, away: Observable<boolean> } {
    return {
      home: this.curClub$.pipe(map(value => value.nameEn === match.home?.nameEn)),
      away: this.curClub$.pipe(map(value => value.nameEn === match.away?.nameEn))
    };
  }

  getHeightInRem(): number {
    return this.BASE_WIDTH_REM * Math.pow(2, this.roundIndex);
  }

  getMatchHeader(): string {
    switch (this.numOfRounds - this.roundIndex) {
      case 1: {
        return $localize `Финал`;
      }
      case 2: {
        return $localize `Полуфинал Матч ${this.matchIndex + 1}`;
      }
      case 3: {
        return $localize `1/4 финала Матч ${this.matchIndex + 1}`;
      }
      default: {
        return $localize `Раунд ${this.roundIndex + 1} Матч ${this.matchIndex + 1}`;
      }
    }
  }
}
