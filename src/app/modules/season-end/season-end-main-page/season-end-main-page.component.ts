import { Component, OnInit } from '@angular/core';
import {SeasonService} from '../../../services/season.service';

@Component({
  selector: 'app-season-end-main-page',
  templateUrl: './season-end-main-page.component.html',
  styleUrls: ['./season-end-main-page.component.css']
})
export class SeasonEndMainPageComponent implements OnInit {

  constructor(private seasonService: SeasonService) { }

  ngOnInit(): void {
    this.seasonService.endCurrentSeason();
  }

}
