import {AfterViewInit, Component, HostListener, Inject, OnInit, PLATFORM_ID} from '@angular/core';
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
import {DOCUMENT, isPlatformBrowser, ViewportScroller} from '@angular/common';
import {StorageService} from '../../../services/storage.service';

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
  displayedResultsIndex = 0;

  private _resultGenSub: Subscription;
  private _resultGenLulSub: Subscription;

  constructor(private store: Store<AppState>,
              private router: Router,
              public resultGen: BaseResultGenService,
              private transferService: TransferService,
              private jobService: JobService,
              private route: ActivatedRoute,
              private seasonService: SeasonService,
              private storage: StorageService) { }

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

  proceed() {
    if (!!this.curWeekResults[this.displayedResultsIndex + 1]) {
      this.displayedResultsIndex++;
    } else {
      this.advanceThroughWeek();
    }
  }

  advanceThroughWeek(noJobs = false) {

    clearSubscription(this._resultGenSub);
    this.store.dispatch(updateTables());        // updating Tables
    this.store.dispatch(advanceAWeek());        // weekNum++

    this.storage.saveStore().subscribe();       // saving game

    let isLastWeekOfTheSeas;
    this.store.select(isLastWeekOfTheSeason).pipe(take(1)).subscribe(value => isLastWeekOfTheSeas = value);
    if (!isLastWeekOfTheSeas) {       // NOT the end of the season


      // this.store.dispatch(advanceAWeek());
      // generate new transfer list if needed
      this.transferService.generateTransferList();          // generate new transfer list (if needed - every 2 weeks for now)
      this.transferService.makeRandomTransfers();

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
    } else {                          // end of the season
      this.jobService.oneMoreWeekOnCurrentJob();
      this.router.navigate([this.ROUTES.SEASON_END]).catch(reason => {
        console.error(reason);
      });
    }
  }
}
