import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../../services/firebase.service';
import {CurrentGameService} from '../../../services/current-game.service';
import {Player} from '../../../interfaces/player';
import {CdkDragEnter, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-roster-main-page',
  templateUrl: './roster-main-page.component.html',
  styleUrls: ['./roster-main-page.component.css']
})
export class RosterMainPageComponent implements OnInit {

  lastPlayerBoxEntered: number;
  players: Player[];

  constructor(private fs: FirebaseService, private game: CurrentGameService) { }

  ngOnInit(): void {
    this.players = this.game.currentPlayers;
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
    }
  }

  mouseEntered(i) {
    this.lastPlayerBoxEntered = i;
  }
}
