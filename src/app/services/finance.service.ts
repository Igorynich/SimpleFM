import { Injectable } from '@angular/core';
import {Club} from '../interfaces/club';
import {Store} from '@ngrx/store';
import {AppState, selectTicketPriceByClubsNameEn} from '../store/selectors/current-game.selectors';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor(private store: Store<AppState>) { }

  generateMatchIncome(attendance: number, homeTeam: Club): number {
    let ticketPrice = 0;
    this.store.select(selectTicketPriceByClubsNameEn, {clubsNameEn: homeTeam.nameEn}).pipe(take(1)).subscribe(value => {
      ticketPrice = value;
    });
    return attendance * ticketPrice;
  }
}
