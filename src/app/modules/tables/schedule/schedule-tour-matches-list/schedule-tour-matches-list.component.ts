import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Match1} from '../../../../interfaces/match1';

@Component({
  selector: 'app-schedule-tour-matches-list',
  templateUrl: './schedule-tour-matches-list.component.html',
  styleUrls: ['./schedule-tour-matches-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleTourMatchesListComponent implements OnInit {

  @Input() schedule: Match1[];
  @Input() tour: number;
  @Input() week: number;

  constructor() {
  }

  ngOnInit(): void {
  }
}
