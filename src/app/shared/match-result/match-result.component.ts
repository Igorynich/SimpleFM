import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Match} from '../../interfaces/match';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {
  AppState,
  selectClubByClubsNameEn,
  selectCurrentClub,
  selectMatchGainsByMatchId,
  selectMatchStatsByMatchId
} from '../../store/selectors/current-game.selectors';
import {Store} from '@ngrx/store';
import {Club} from '../../interfaces/club';
import {Player} from '../../interfaces/player';
import {MatchStats1} from '../../interfaces/match-stats1';
import {ConfigService} from '../../services/config.service';

@Component({
  selector: 'app-match-result',
  templateUrl: './match-result.component.html',
  styleUrls: ['./match-result.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatchResultComponent implements OnInit {

  @Input() match: Match;
  @Input() showGains = true;

  curClub$: Observable<Club>;
  matchStats$: Observable<MatchStats1>;
  matchGaines$: Observable<{gains: Player[], losses: Player[]}>;

  homeClub$: Observable<Club>;
  awayClub$: Observable<Club>;

  constructor(private store: Store<AppState>,
              public config: ConfigService) { }

  ngOnInit(): void {
    this.homeClub$ = this.store.select(selectClubByClubsNameEn, {clubsNameEn: this.match.homeNameEn});
    this.awayClub$ = this.store.select(selectClubByClubsNameEn, {clubsNameEn: this.match.awayNameEn});
    this.curClub$ = this.store.select(selectCurrentClub);
    this.matchStats$ = this.store.select(selectMatchStatsByMatchId, {matchId: this.match.id});
    this.matchGaines$ = this.store.select(selectMatchGainsByMatchId, {matchId: this.match.id});
  }

  /*isMyClub$(match: Match): {home: Observable<boolean>, away: Observable<boolean>} {
    return {
      home: this.curClub$.pipe(map(value => value.nameEn === match.homeNameEn)),
      away: this.curClub$.pipe(map(value => value.nameEn === match.awayNameEn))
    };
  }*/

  /*keys(obj): string[] {
    return Object.keys(obj);
  }*/
}
