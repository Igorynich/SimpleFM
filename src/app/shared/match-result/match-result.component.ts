import {Component, Input, OnInit} from '@angular/core';
import {Match} from '../../interfaces/match';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {
  AppState,
  selectCurrentClub,
  selectMatchGainsByMatchId,
  selectMatchStatsByMatchId
} from '../../store/selectors/current-game.selectors';
import {Store} from '@ngrx/store';
import {Club} from '../../interfaces/club';
import {MatchStats} from '../../interfaces/match-stats';
import {Player} from '../../interfaces/player';

@Component({
  selector: 'app-match-result',
  templateUrl: './match-result.component.html',
  styleUrls: ['./match-result.component.css']
})
export class MatchResultComponent implements OnInit {

  @Input() match: Match;
  @Input() showGains = true;

  curClub$: Observable<Club>;
  matchStats$: Observable<MatchStats>;
  matchGaines$: Observable<{gains: Player[], losses: Player[]}>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.curClub$ = this.store.select(selectCurrentClub);
    this.matchStats$ = this.store.select(selectMatchStatsByMatchId, {matchId: this.match.id});
    this.matchGaines$ = this.store.select(selectMatchGainsByMatchId, {matchId: this.match.id});
  }

  isMyClub$(match: Match): {home: Observable<boolean>, away: Observable<boolean>} {
    return {
      home: this.curClub$.pipe(map(value => value.nameEn === match.home.nameEn)),
      away: this.curClub$.pipe(map(value => value.nameEn === match.away.nameEn))
    };
  }

  keys(obj): string[] {
    return Object.keys(obj);
  }
}
