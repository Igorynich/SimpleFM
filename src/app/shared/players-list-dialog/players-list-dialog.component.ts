import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {Store} from '@ngrx/store';
import {
  AppState,
  selectClubByClubsName,
  selectClubsRosterStats,
  selectPlayersByClubsName
} from '../../store/selectors/current-game.selectors';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Player} from '../../interfaces/player';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {PlayerStats} from '../../interfaces/player-stats';
import {ConfigService} from '../../services/config.service';

@Component({
  selector: 'app-players-list-dialog',
  templateUrl: './players-list-dialog.component.html',
  styleUrls: ['./players-list-dialog.component.css']
})
export class PlayersListDialogComponent implements OnInit {

  players$: Observable<Player[]>;
  stats$: Observable<Map<string, PlayerStats>>;

  constructor(private store: Store<AppState>,
              private dialogRef: MatDialogRef<PlayersListDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { clubName: string },
              public config: ConfigService) {
  }

  ngOnInit(): void {
    this.players$ = this.store.select(selectPlayersByClubsName, {clubsName: this.data.clubName});
    this.stats$ = this.store.select(selectClubByClubsName, {clubsName: this.data.clubName})
      .pipe(switchMap(club => this.store.select(selectClubsRosterStats, {clubsNameEn: club.nameEn})));
  }

}
