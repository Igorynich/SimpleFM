import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../store/selectors/current-game.selectors';
import {
  giveSeasonalPrizeMoney,
  seasonalChangeOfPlayersPowers,
  makeDivisionRotations,
  advanceASeason, generateStuffForANewSeason
} from '../store/actions/current-game.actions';
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
  }

  startNewSeason() {
    // player power change
    this.changePlayersPowers();
    // division rotations
    // this.makeDivisionRotations();
    // change season number
    this.store.dispatch(advanceASeason());
    // generate tables, power rankings and stuff
    this.store.dispatch(generateStuffForANewSeason());
  }

  private givePrizeMoney() {
    // this.finService.giveSeasonalPrizeMoney()
    this.store.dispatch(giveSeasonalPrizeMoney());
  }

  private changePlayersPowers() {
    this.store.dispatch(seasonalChangeOfPlayersPowers());
  }

  private makeDivisionRotations() {
    this.store.dispatch(makeDivisionRotations());
  }
}
