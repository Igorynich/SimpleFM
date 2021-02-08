import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState, selectCurrentWeek} from '../../../store/selectors/current-game.selectors';
import {combineLatest, Observable, of, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import { ROUTES } from 'src/app/constants/routes';
import {advanceAWeek, updateTables} from '../../../store/actions/current-game.actions';
import {BaseResultGenService} from '../../../services/base-result-gen.service';
import {concatMap, count, switchMap, take, tap} from 'rxjs/operators';
import {CurrentWeekSchedule} from '../../../interfaces/current-week-schedule';
import {TransferService} from '../../../services/transfer.service';
import {JobService} from '../../../services/job.service';
import {clearSubscription} from '../../../utils/clean-subscriptions';

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
              public resultGen: BaseResultGenService,
              private transferService: TransferService,
              private jobService: JobService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentWeek$ = this.store.select(selectCurrentWeek).pipe(take(1));
    // this.curWeekResults$ = this.currentWeek$.pipe(concatMap(weekNum => this.resultGen.generateWeekResults()));
    // this.curWeekResults$ = this.resultGen.generateWeekResults().pipe(tap(x => console.warn('RESULTS', x)));
    /*this.curWeekResults$.subscribe(value => {
      console.warn('RESULTS111', value);
      this.curWeekResults = [...value];
    });*/
    /*this._resultGenSub = this.resultGen.generateWeekResults().subscribe(value => {
      this.curWeekResults = value;
    });*/
    this._resultGenSub = combineLatest([
      this.resultGen.generateWeekResults(),
      this.route.queryParams
    ]).pipe(switchMap(([results, queryParams]) => {
      this.curWeekResults = results;
      if (queryParams.goThrough) {
        this.advanceThroughWeek(true);
      }
      return of(null);
    })).subscribe();
    /*this._resultGenLulSub = this.resultGen.lul$.subscribe(value => {
      console.error('RESULTS222', value);
      this.curWeekResults = [...value];
    });*/
  }


  advanceThroughWeek(noJobs = false) {
    if (1) {
      // TODO check if season ends

      // unsub to prevent res gen for next week (cause store will emit this.store.select(selectCurrentWeekSchedule) value on curWeek change)
      clearSubscription(this._resultGenSub);
      // just a clean up unsub
      // this._resultGenLulSub.unsubscribe();
      this.store.dispatch(updateTables());

      this.store.dispatch(advanceAWeek());
      // generate new transfer list if needed
      this.transferService.generateTransferList();
      // random transfers

      // get new job offer
      if (!noJobs && this.jobService.gotNewJobOffer()) {
        this.router.navigate([this.ROUTES.NEW_JOB]).catch(reason => {
          console.error(reason);
        });
      } else {
        this.jobService.oneMoreWeekOnCurrentJob();
        this.router.navigate([this.ROUTES.OFFICE]).catch(reason => {
          console.error(reason);
        });
      }
    }
  }
}
