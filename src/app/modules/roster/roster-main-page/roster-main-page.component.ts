import {Component, OnDestroy, OnInit} from '@angular/core';
import {FirebaseService} from '../../../services/firebase.service';
import {CurrentGameService} from '../../../services/current-game.service';
import {Player} from '../../../interfaces/player';
import {CdkDragEnter, moveItemInArray} from '@angular/cdk/drag-drop';
import {Store} from '@ngrx/store';
import {AppState, selectCurrentPlayers} from '../../../store/selectors/current-game.selectors';
import {Observable, Subscription} from 'rxjs';
import {take} from 'rxjs/operators';
import {updatePlayers} from '../../../store/actions/current-game.actions';
import {CleanSubscriptions} from '../../../utils/clean-subscriptions';

@CleanSubscriptions()
@Component({
  selector: 'app-roster-main-page',
  templateUrl: './roster-main-page.component.html',
  styleUrls: ['./roster-main-page.component.css']
})
export class RosterMainPageComponent implements OnInit, OnDestroy {

  lastPlayerBoxEntered: number;
  players: Player[];

  private _playersSub: Subscription;

  constructor(private fs: FirebaseService, private game: CurrentGameService, private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.players = this.game.currentPlayers;
    this._playersSub = this.store.select(selectCurrentPlayers).subscribe((value: Player[]) => {
      this.players = [...value];
    });
  }

  ngOnDestroy(): void {
  }

  getListClass(player, index) {
    return {
      'pos-gk': player.position === 'GK',
      'pos-d': player.position === 'D',
      'pos-m': player.position === 'M',
      'pos-f': player.position === 'F',
      'list-item': true,
      'starting-squad-separator': index === 10
    };
  }

  drop(event) {
    console.log('Drag event', event);
    if (event.isPointerOverContainer) {
      const draggedPlayer = this.players[event.previousIndex];
      const draggedOnPlayer = this.players[this.lastPlayerBoxEntered];
      this.players[event.previousIndex] = draggedOnPlayer;
      this.players[this.lastPlayerBoxEntered] = draggedPlayer;
      this.store.dispatch(updatePlayers({newPlayers: this.players}));
    }
  }

  mouseEntered(i) {
    this.lastPlayerBoxEntered = i;
  }
}
