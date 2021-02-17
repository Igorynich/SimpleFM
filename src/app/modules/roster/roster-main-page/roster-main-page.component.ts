import {Component, OnDestroy, OnInit} from '@angular/core';
import {FirebaseService} from '../../../services/firebase.service';
import {CurrentGameService} from '../../../services/current-game.service';
import {Player} from '../../../interfaces/player';
import {CdkDragEnter, moveItemInArray} from '@angular/cdk/drag-drop';
import {Store} from '@ngrx/store';
import {
  AppState, selectClubsRosterLastMatchStats,
  selectClubsRosterStats,
  selectCurrentClub,
  selectCurrentPlayers,
  selectNextOpponent
} from '../../../store/selectors/current-game.selectors';
import {Observable, Subscription} from 'rxjs';
import {switchMap, take, tap} from 'rxjs/operators';
import {updatePlayers} from '../../../store/actions/current-game.actions';
import {CleanSubscriptions} from '../../../utils/clean-subscriptions';
import {getStarters, sortStarters} from '../../../utils/sort-roster';
import {SnackBarService} from '../../../services/snack-bar.service';
import {PlayerStats} from '../../../interfaces/player-stats';

@CleanSubscriptions()
@Component({
  selector: 'app-roster-main-page',
  templateUrl: './roster-main-page.component.html',
  styleUrls: ['./roster-main-page.component.css']
})
export class RosterMainPageComponent implements OnInit, OnDestroy {

  lastPlayerBoxEntered: number;
  players: Player[];
  stats: Map<string, PlayerStats>;
  statsLastGame: Map<string, PlayerStats>;

  private _playersSub: Subscription;
  private _statsSub: Subscription;
  private _statsLGSub: Subscription;

  constructor(private fs: FirebaseService, private game: CurrentGameService, private store: Store<AppState>,
              private snack: SnackBarService) {
  }

  ngOnInit(): void {
    // this.players = this.game.currentPlayers;
    this._playersSub = this.store.select(selectCurrentPlayers).pipe(take(1)).subscribe((value: Player[]) => {
      console.log('Players', value);
      this.players = [...value];
    });
    this._statsSub = this.store.select(selectCurrentClub).pipe(take(1), switchMap(curClub =>
      this.store.select(selectClubsRosterStats, {clubsNameEn: curClub.nameEn}).pipe(take(1))))
      .subscribe((value: Map<string, PlayerStats>) => {
        this.stats = value;
        console.log('Players Stats', value);
      });
    this._statsLGSub = this.store.select(selectCurrentClub).pipe(take(1), switchMap(curClub =>
      this.store.select(selectClubsRosterLastMatchStats, {clubsNameEn: curClub.nameEn}).pipe(take(1))))
      .subscribe((value: Map<string, PlayerStats>) => {
        this.statsLastGame = value;
        console.log('Players Stats Last Game', value);
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

  drop(event: { isPointerOverContainer: any; previousIndex: string | number; }) {
    console.log('Drag event', event);
    if (event.isPointerOverContainer) {
      const draggedPlayer = this.players[event.previousIndex];
      const draggedOnPlayer = this.players[this.lastPlayerBoxEntered];
      const updatedRoster = [...this.players];
      updatedRoster[event.previousIndex] = draggedOnPlayer;
      updatedRoster[this.lastPlayerBoxEntered] = draggedPlayer;
      console.warn('Is Roster Legit', this.isRosterLegit(this.players));
      if (this.isRosterLegit(updatedRoster)) {
        this.store.dispatch(updatePlayers({newPlayers: sortStarters(updatedRoster)}));
      }
    }
  }

  /**
   * checks if starting roster has just 1 GK and stuff
   * @param roster
   */
  private isRosterLegit(roster: Player[]): boolean {
    const starters = getStarters(roster);
    const hasSingleGk = starters.gk.length === 1;
    const hasThreeDefs = starters.d.length >= 3;
    const hasTwoMids = starters.m.length >= 2;
    if (!hasSingleGk) {
      this.snack.createSnackBar('Должен быть один голкипер');
    }
    if (!hasThreeDefs) {
      this.snack.createSnackBar('Должно быть минимум 3 защитника');
    }
    if (!hasTwoMids) {
      this.snack.createSnackBar('Должно быть минимум 2 полузащитника');
    }
    return hasSingleGk && hasThreeDefs && hasTwoMids;
  }

  mouseEntered(i) {
    this.lastPlayerBoxEntered = i;
  }
}
