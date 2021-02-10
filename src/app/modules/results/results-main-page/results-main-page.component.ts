import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState, isLastWeekOfTheSeason, selectCurrentWeek} from '../../../store/selectors/current-game.selectors';
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
import {SeasonService} from '../../../services/season.service';

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
              private route: ActivatedRoute,
              private seasonService: SeasonService) { }

  ngOnInit(): void {
    this.currentWeek$ = this.store.select(selectCurrentWeek).pipe(take(1));

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
  }


  advanceThroughWeek(noJobs = false) {

    clearSubscription(this._resultGenSub);
    this.store.dispatch(updateTables());
    this.store.dispatch(advanceAWeek());

    let isLastWeekOfTheSeas;
    this.store.select(isLastWeekOfTheSeason).pipe(take(1)).subscribe(value => isLastWeekOfTheSeas = value);
    if (!isLastWeekOfTheSeas) {


      // this.store.dispatch(advanceAWeek());
      // generate new transfer list if needed
      this.transferService.generateTransferList();
      // TODO random transfers

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
    } else {      // end of the season
      this.jobService.oneMoreWeekOnCurrentJob();
      this.router.navigate([this.ROUTES.SEASON_END]).catch(reason => {
        console.error(reason);
      });
    }
  }
}
