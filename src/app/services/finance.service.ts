import { Injectable } from '@angular/core';
import {Club} from '../interfaces/club';
import {Store} from '@ngrx/store';
import {
  AppState,
  getCurrentCountryLeagues,
  selectCurrentClub, selectLeagueTableByLeaguesNameEn,
  selectTicketPriceByClubsNameEn
} from '../store/selectors/current-game.selectors';
import {switchMap, take} from 'rxjs/operators';
import {round} from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  readonly LEAGUE_FIRST_PRIZE_FUND_BY_TIER = {      // millions
    1: 200,
    2: 100,
    3: 75,
    4: 50
  };

  readonly PRIZE_DROP_PER_PLACE_PCT = 2;

  readonly ADDITIONAL_DROP_AFTER_WINNER_PCT = 5;

  readonly CUP_WINNER_PRIZE = 100;

  readonly CUP_SECOND_PRIZE_PCT = 50;

  readonly CUP_POWER_DECREASE = 2;      // prize money /2 every round

  constructor(private store: Store<AppState>) { }

  generateMatchIncome(attendance: number, homeTeam: Club): number {
    let ticketPrice = 0;
    this.store.select(selectTicketPriceByClubsNameEn, {clubsNameEn: homeTeam.nameEn}).pipe(take(1)).subscribe(value => {
      ticketPrice = value;
    });
    return attendance * ticketPrice;
  }

  calculateClubsLeaguePrizeMoney(leagueTier: number, leaguePos: number, totalClubsInLeague: number): number {
    const leagueFirstPrizeFund = this.LEAGUE_FIRST_PRIZE_FUND_BY_TIER[leagueTier];
    let resPct = 1 - ((leaguePos - 1) * this.PRIZE_DROP_PER_PLACE_PCT) / 100;
    if (leaguePos !== 1) {
      resPct -= this.ADDITIONAL_DROP_AFTER_WINNER_PCT / 100;
    }
    // console.log(`LEAGUE PRIZE PERCENT FOR ${leaguePos} PLACE`, resPct);
    return round(leagueFirstPrizeFund * round(resPct, 2), 3);
  }

  calculateClubsCupPrizeMoney(cupRoundOfElimination: number, totalRounds: number): number {
    const secondPrize = this.CUP_WINNER_PRIZE * (this.CUP_SECOND_PRIZE_PCT / 100);
    const divider = Math.pow(this.CUP_POWER_DECREASE, (totalRounds - cupRoundOfElimination));     // 2 power round dif
    return round(secondPrize / divider, 3);
  }
}
