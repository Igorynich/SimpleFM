import {UserService} from '../../../../services/user.service';
import {
  AppState,
  selectCurrentClub, selectCurrentSeason, selectCurrentState,
  selectCurrentWeek,
  selectNextOpponent
} from '../../../../store/selectors/current-game.selectors';
import {Store} from '@ngrx/store';
import {Club} from '../../../../interfaces/club';
import {ActivatedRoute, Router} from '@angular/router';
import { ROUTES } from 'src/app/constants/routes';
import {interval, Observable, of, Subscription} from 'rxjs';
import {filter, map, switchMap, take, tap} from 'rxjs/operators';
import { logOut } from 'src/app/store/actions/current-game.actions';
import {clearSubscription} from '../../../../utils/clean-subscriptions';
import {MatDialog} from '@angular/material/dialog';
import {FeedbackDialogComponent} from '../../../../shared/feedback-dialog/feedback-dialog.component';
import {ConfigService} from '../../../../services/config.service';
import {ConfirmationDialogComponent} from '../../../../shared/confirmation-dialog/confirmation-dialog.component';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentClub$: Observable<Club>;
  currentWeek$: Observable<number>;
  currentSeason$: Observable<number>;
  nextOpponent$: Observable<{
    opponent: Club, field: string
  }>;
  ROUTES = ROUTES;

  GO_THROUGH = 10;      // test shit
  isGoingThrough = false;

  constructor(public userService: UserService,
              private store: Store<AppState>,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              public config: ConfigService) { }

  ngOnInit(): void {
    this.currentClub$ = this.store.select(selectCurrentClub);
    this.currentWeek$ = this.store.select(selectCurrentWeek);
    this.currentSeason$ = this.store.select(selectCurrentSeason);
    this.nextOpponent$ = this.store.select(selectCurrentClub).pipe(switchMap(curClub => {
      console.log('HEADER curClub', curClub);
      if (!curClub) {
        return of(null);
      }
      return this.store.select(selectNextOpponent, {clubsNameEn: curClub.nameEn});
    }));

  }

  // TODO: hide
  navigateToAdmin() {
    this.router.navigate([this.ROUTES.ADMIN], {relativeTo: this.route}).catch(reason => {
      console.error(reason);
    });
  }

  logOut() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px'
    });
    dialogRef.afterClosed().pipe(take(1)).subscribe(res => {
      if (res) {
        this.router.navigate(['']).then(value => {
          this.userService.logOut();
        }).catch(reason => {
          console.error(reason);
        });
      }
    });
  }

  goToNextWeek() {
    this.router.navigate([this.ROUTES.RESULTS]).catch(reason => {
      console.error(reason);
    });
  }

  showState() {
    this.store.select(selectCurrentState).pipe(take(1)).subscribe(value => {
      console.warn('STATE: ', value);
    });
  }

  goThroughXNextWeeks(x: number) {
    // clearSubscription(this._intervalSub);
    // let i = 0;
    this.isGoingThrough = true;
    interval(500).pipe(take(x)).subscribe(value => {
      console.warn('Interval', value);
      value++;
      this.router.navigate([this.ROUTES.RESULTS], {queryParams: {goThrough: x - value}}).catch(reason => {
        console.error(reason);
      });

    });
  }

  supportButtonClick() {
    this.dialog.open(FeedbackDialogComponent, {
      width: '500px',
      data: {type: 'feedback'}
    });
  }

  bugReportButtonClick() {
    this.dialog.open(FeedbackDialogComponent, {
      width: '500px',
      data: {type: 'bug'}
    });
  }
}
