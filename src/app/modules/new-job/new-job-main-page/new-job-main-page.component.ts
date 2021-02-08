import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState, selectLeagueTableByLeaguesNameEn} from '../../../store/selectors/current-game.selectors';
import {Router} from '@angular/router';
import {JobService} from '../../../services/job.service';
import {Club} from '../../../interfaces/club';
import { ROUTES } from 'src/app/constants/routes';
import {LeagueTable} from '../../../interfaces/league-table';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-new-job-main-page',
  templateUrl: './new-job-main-page.component.html',
  styleUrls: ['./new-job-main-page.component.css']
})
export class NewJobMainPageComponent implements OnInit {

  ROUTES = ROUTES;
  offeringClub: Club;
  offeringClubLeaguePosition$: Observable<number>;

  constructor(private store: Store<AppState>,
              private router: Router,
              private jobService: JobService) { }

  ngOnInit(): void {
    this.offeringClub = this.jobService.findNewJobOfferingCLub();
    this.offeringClubLeaguePosition$ = this.store.select(selectLeagueTableByLeaguesNameEn, {leaguesNameEn: this.offeringClub.leagueNameEn})
      .pipe(map((table: LeagueTable[]) => {
        return table.findIndex(value => value.clubName === this.offeringClub.nameRu || value.clubName === this.offeringClub.nameEn);
      }));
  }

  acceptOffer() {
    this.jobService.newJobTaken(this.offeringClub);
    this.router.navigate([this.ROUTES.OFFICE]).catch(reason => {
      console.error(reason);
    });
  }

  declineOffer() {
    this.router.navigate([this.ROUTES.OFFICE]).catch(reason => {
      console.error(reason);
    });
  }
}
