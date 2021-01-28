import { Component, OnInit } from '@angular/core';
import {Club} from '../../../interfaces/club';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState, selectCurrentClub} from '../../../store/selectors/current-game.selectors';
import {expandStadium} from '../../../store/actions/current-game.actions';

@Component({
  selector: 'app-stadium-main-page',
  templateUrl: './stadium-main-page.component.html',
  styleUrls: ['./stadium-main-page.component.css']
})
export class StadiumMainPageComponent implements OnInit {

  curClub$: Observable<Club>;
  readonly EXP_COST = 20;     // в М за 1000 мест для зрителей // расчитывать в зависимости от нынешней вместимости?
  readonly EXP_STEP = 1000;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.curClub$ = this.store.select(selectCurrentClub);
  }

  expandStadiumClick() {
    console.log('Stadium expand click');
    this.store.dispatch(expandStadium( {step: this.EXP_STEP, cost: this.EXP_COST}));
  }

  haveEnoughMoney(curClub: Club) {
    return curClub.budget >= this.EXP_COST;
  }
}
