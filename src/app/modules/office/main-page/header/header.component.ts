import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../services/user.service';
import {
  AppState,
  selectCurrentClub,
  selectCurrentWeek,
  selectNextOpponent,
  selectScheduleByClubsNameEn
} from '../../../../store/selectors/current-game.selectors';
import {Store} from '@ngrx/store';
import {Club} from '../../../../interfaces/club';
import {ActivatedRoute, Router} from '@angular/router';
import { ROUTES } from 'src/app/constants/routes';
import {Observable} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentClub$: Observable<Club>;
  currentWeek$: Observable<number>;
  nextOpponent$: Observable<{
    opponent: Club, field: string
  }>;
  ROUTES = ROUTES;

  constructor(public userService: UserService,
              private store: Store<AppState>,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentClub$ = this.store.select(selectCurrentClub);
    this.currentWeek$ = this.store.select(selectCurrentWeek);
    this.nextOpponent$ = this.store.select(selectCurrentClub).pipe(switchMap(curClub =>
      this.store.select(selectNextOpponent, {clubsNameEn: curClub.nameEn})), tap(x => console.log('tap', x)));
  }

  // TODO: hide
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
  }

  goToNextWeek() {
    this.router.navigate([this.ROUTES.RESULTS]).catch(reason => {
      console.error(reason);
    });
  }
}
