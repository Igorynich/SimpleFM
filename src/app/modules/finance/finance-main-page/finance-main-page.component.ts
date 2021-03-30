import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {
  AppState,
  selectClubsRosterStats,
  selectCurrentClub, selectCurrentSeason, selectCurrentWeek,
  selectFinanceRecordsByClubsNameEn
} from '../../../store/selectors/current-game.selectors';
import {switchMap} from 'rxjs/operators';
import {FinanceRecord} from '../../../interfaces/finance-record';
import {Observable} from 'rxjs';
import {Club} from '../../../interfaces/club';

@Component({
  selector: 'app-finance-main-page',
  templateUrl: './finance-main-page.component.html',
  styleUrls: ['./finance-main-page.component.css']
})
export class FinanceMainPageComponent implements OnInit {

  curClub$: Observable<Club>;
  curWeek$: Observable<number>;
  curSeason$: Observable<number>;
  financeRecords$: Observable<{[week: number]: FinanceRecord[]}>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.curWeek$ = this.store.select(selectCurrentWeek);
    this.curSeason$ = this.store.select(selectCurrentSeason);
    this.curClub$ = this.store.select(selectCurrentClub);
    this.financeRecords$ = this.curClub$.pipe(switchMap(curClub => {
      return this.store.select(selectFinanceRecordsByClubsNameEn, {clubsNameEn: curClub.nameEn});
    }));
  }

  weeksTo(curWeek: number): number[] {
    const array = [];
    for (let i = 1; i <= curWeek; i++) {
      array.push(i);
    }
    return array;
  }

  /*calculateBudget(club: Club, records: {[week: number]: FinanceRecord[]} | null): number {
    let budget = club.budget;
    if (records) {
      Object.values(records).forEach((recs: FinanceRecord[]) => {
        recs.forEach((rec: FinanceRecord) => {
          budget += rec.income ? rec.income / 1000000 : 0;
          budget -= rec.expense ? rec.expense / 1000000 : 0;
        });
      });
    }
    return budget;
  }*/
}
