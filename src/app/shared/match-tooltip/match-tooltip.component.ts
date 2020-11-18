import {Component, OnInit} from '@angular/core';
import {Match} from '../../interfaces/match';

@Component({
  selector: 'app-match-tooltip',
  templateUrl: './match-tooltip.component.html',
  styleUrls: ['./match-tooltip.component.css']
})
export class MatchTooltipComponent implements OnInit {

  match: Match;
  showGains: boolean;

  constructor() {
  }

  ngOnInit() {
  }
}
