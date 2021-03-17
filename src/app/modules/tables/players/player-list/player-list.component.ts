import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Player} from '../../../../interfaces/player';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerListComponent implements OnInit {

  @Input() playersStats: Map<Player, { goals?: number, assists?: number, 'g+a'?: number }>;
  @Input() type: 'goals' | 'assists' | 'g+a';

  compareFunc: (a, b) => number;

  constructor() { }

  ngOnInit(): void {
    switch (this.type) {
      case 'goals': {
        this.compareFunc = this.compareByGoals;
        break;
      }
      case 'assists': {
        this.compareFunc = this.compareByAssists;
        break;
      }
      case 'g+a': {
        this.compareFunc = this.compareByGP;
        break;
      }
    }
  }

  compareByGoals(a, b) {
    return (b.value.goals || 0) - (a.value.goals || 0);
  }

  compareByAssists(a, b) {
    return (b.value.assists || 0) - (a.value.assists || 0);
  }

  compareByGP(a, b) {
    return (b.value['g+a'] || 0) - (a.value['g+a'] || 0);
  }
}
