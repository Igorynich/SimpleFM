import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState, selectCurrentWeek} from '../../../store/selectors/current-game.selectors';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import { ROUTES } from 'src/app/constants/routes';
import {advanceAWeek} from '../../../store/actions/current-game.actions';
import {BaseResultGenService} from '../../../services/base-result-gen.service';
import {concatMap, count, switchMap, tap} from 'rxjs/operators';
import {CurrentWeekSchedule} from '../../../interfaces/current-week-schedule';

@Component({
  selector: 'app-results-main-page',
  templateUrl: './results-main-page.component.html',
  styleUrls: ['./results-main-page.component.css']
})
export class ResultsMainPageComponent implements OnInit {

  currentWeek$: Observable<number>;
  ROUTES = ROUTES;
  curWeekResults$: Observable<CurrentWeekSchedule[]>;

  curWeekResults: CurrentWeekSchedule[];

  private _resultGenSub: Subscription;
  private _resultGenLulSub: Subscription;

  constructor(private store: Store<AppState>,
              private router: Router,
              public resultGen: BaseResultGenService) { }

  ngOnInit(): void {
    this.currentWeek$ = this.store.select(selectCurrentWeek);
    // this.curWeekResults$ = this.currentWeek$.pipe(concatMap(weekNum => this.resultGen.generateWeekResults()));
    // this.curWeekResults$ = this.resultGen.generateWeekResults().pipe(tap(x => console.warn('RESULTS', x)));
    /*this.curWeekResults$.subscribe(value => {
      console.warn('RESULTS111', value);
      this.curWeekResults = [...value];
    });*/
    this._resultGenSub = this.resultGen.generateWeekResults().subscribe();
    this._resultGenLulSub = this.resultGen.lul$.subscribe(value => {
      console.error('RESULTS222', value);
      this.curWeekResults = [...value];
    });
  }


  advanceThroughWeek() {
    if (1) {
      // TODO check if season ends

      // unsub to prevent res gen for next week (cause store will emit this.store.select(selectCurrentWeekSchedule) value on curWeek change)
      this._resultGenSub.unsubscribe();
      // just a clean up unsub
      this._resultGenLulSub.unsubscribe();

      this.store.dispatch(advanceAWeek());

      this.router.navigate([this.ROUTES.OFFICE]).catch(reason => {
        console.error(reason);
      });
    }
  }
}
