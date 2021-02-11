import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../store/selectors/current-game.selectors';
import {giveSeasonalPrizeMoney} from '../store/actions/current-game.actions';
import {FinanceService} from './finance.service';

@Injectable({
  providedIn: 'root'
})
export class SeasonService {

  constructor(private store: Store<AppState>,
              private finService: FinanceService) { }

  endCurrentSeason() {
    console.warn('ENDING CURRENT SEASON');
    // prize money
    this.givePrizeMoney();
    // player power change
    // division rotations

  }

  private givePrizeMoney() {
    // this.finService.giveSeasonalPrizeMoney()
    this.store.dispatch(giveSeasonalPrizeMoney());
  }
}
