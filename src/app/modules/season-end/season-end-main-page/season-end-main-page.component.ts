import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SeasonService} from '../../../services/season.service';
import {Router} from '@angular/router';
import { ROUTES } from 'src/app/constants/routes';

@Component({
  selector: 'app-season-end-main-page',
  templateUrl: './season-end-main-page.component.html',
  styleUrls: ['./season-end-main-page.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class SeasonEndMainPageComponent implements OnInit {

  selectedTab = 0;
  ROUTES = ROUTES;

  constructor(private seasonService: SeasonService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.seasonService.endCurrentSeason();
  }

  startNewSeason() {
    this.seasonService.startNewSeason();
    this.router.navigate([this.ROUTES.OFFICE]).catch(reason => {
      console.error(reason);
    });
  }
}


