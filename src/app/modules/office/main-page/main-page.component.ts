import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute, Event, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {ROUTES} from '../../../constants/routes';
import {CurrentGameService} from '../../../services/current-game.service';
import {MatDialog} from '@angular/material/dialog';
import {InfoDialogComponent} from '../../../shared/info-dialog/info-dialog.component';
import {Store} from '@ngrx/store';
import {CurrentGameState} from '../../../store/reducers/current-game.reducer';
import {getBaseData, getClub, gotPlayers} from '../../../store/actions/current-game.actions';
import {
  AppState,
  curGameLoading,
  selectCurrentClub, selectCurrentPlayers,
  selectCurrentSeason,
  selectCurrentWeek
} from '../../../store/selectors/current-game.selectors';
import {combineLatest, Observable, of, Subscription} from 'rxjs';
import {Club} from '../../../interfaces/club';
import {switchMap, take} from 'rxjs/operators';
import {CleanSubscriptions} from '../../../utils/clean-subscriptions';

@CleanSubscriptions()
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy {

  cards = [
    {
      nameEn: 'Roster',
      nameRu: 'Состав',
      route: ROUTES.ROSTER
    },
    {
      nameEn: 'Schedule',
      nameRu: 'Расписание',
      route: ROUTES.SCHEDULE
    },
    {
      nameEn: 'Tables',
      nameRu: 'Таблицы',
      route: ROUTES.TABLES
    },
    {
      nameEn: 'Finance',
      nameRu: 'Финансы',
      route: ROUTES.FINANCE
    },
    {
      nameEn: 'Stadium',
      nameRu: 'Стадион',
      route: ROUTES.STADIUM
    },
    {
      nameEn: 'Transfer Market',
      nameRu: 'Трансфер Маркет',
      route: ROUTES.TRANSFER_MARKET
    }, {}, {}
  ];
  currentClub: Club;
  loading = false;
  ROUTES = ROUTES;

  private _initStoreSub: Subscription;
  private _curClubSub: Subscription;
  private _loadSub: Subscription;

  constructor(public userService: UserService,
              public router: Router,
              private route: ActivatedRoute,
              public game: CurrentGameService,
              private dialog: MatDialog,
              private store: Store<AppState>) { }

  ngOnInit() {
    console.log('OFFICE COMPONENTN');
    this._loadSub = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        console.log('NAV START');
        this.loading = true;
      }
      if (event instanceof NavigationEnd) {
        console.log('NAV END');
        this.loading = false;
      }
    });
    this._initStoreSub = combineLatest([
      this.store.select(selectCurrentWeek),
      this.store.select(selectCurrentSeason),
      this.store.select(selectCurrentPlayers)
    ]).pipe(take(1)).subscribe(([currentWeek, curSeason, curPlayers]) => {
      console.log('Cur week', currentWeek);
      if (currentWeek === 1 && curSeason === 1) {
        this.store.dispatch(getBaseData());
      } else if (currentWeek === 1 && curSeason > 1) {
        this.store.dispatch(gotPlayers({players: curPlayers}));
      }
    });

    // this.loading$ = this.store.select(curGameLoading);
    this._curClubSub = this.store.select(selectCurrentClub).subscribe(value => {
      this.currentClub = value;
    });
    /*this.game.getCurrentClub().subscribe(value => {
      console.log('CURRENT CLUB', this.game.currentClub);
      this.loading = false;
      const dialogRef = this.dialog.open(InfoDialogComponent, {
        width: '550px',
        data: this.game.currentClub
      });
    });*/
  }

  ngOnDestroy(): void {
  }

  /*// TODO: hide
  navigateToAdmin() {
    this.router.navigate([this.ROUTES.ADMIN], {relativeTo: this.route}).catch(reason => {
      console.error(reason);
    });
  }

  logOut() {
    this.router.navigate(['../'], {relativeTo: this.route}).then(value => {
      this.userService.logOut();
    }).catch(reason => {
      console.error(reason);
    });
  }*/

  navigateToCard(card: { nameRu: string; route: string; nameEn: string }) {
    this.router.navigate([card.route], {relativeTo: this.route}).then(value => {

    }).catch(reason => {
      console.error(reason);
    });
  }
}
