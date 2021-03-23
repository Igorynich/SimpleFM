import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Player} from '../../../../interfaces/player';
import {Store} from '@ngrx/store';
import {AppState, selectCurrentClub} from '../../../../store/selectors/current-game.selectors';
import {Observable} from 'rxjs';
import {Club} from '../../../../interfaces/club';
import {ConfigService} from '../../../../services/config.service';

@Component({
  selector: 'app-player-list-item',
  templateUrl: './player-list-item.component.html',
  styleUrls: ['./player-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerListItemComponent implements OnInit {

  @Input() index: number;
  @Input() playerRecord: {key: Player, value: { goals?: number, assists?: number, 'g+a'?: number }};
  @Input() type: 'goals' | 'assists' | 'g+a';

  curClub$: Observable<Club>;
  displayProp: string;

  constructor(private store: Store<AppState>,
              public config: ConfigService) { }

  ngOnInit(): void {
    this.curClub$ = this.store.select(selectCurrentClub);
    switch (this.type) {
      case 'goals': {
        this.displayProp = 'goals';
        break;
      }
      case 'assists': {
        this.displayProp = 'assists';
        break;
      }
      case 'g+a': {
        this.displayProp = 'g+a';
        break;
      }
    }
  }

}
