import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {LeagueTable} from '../../../interfaces/league-table';
import {Club} from '../../../interfaces/club';
import {AppState, selectCurrentClub} from '../../../store/selectors/current-game.selectors';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {PlayersListDialogComponent} from '../../../shared/players-list-dialog/players-list-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-league-table',
  templateUrl: './league-table.component.html',
  styleUrls: ['./league-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeagueTableComponent implements OnInit {

  @Input() table: LeagueTable[];

  curClub$: Observable<Club>;
  displayedColumns: string[] = ['position', 'clubName', 'games', 'wins', 'draws', 'loses', 'gf', 'ga', 'gd', 'points'];

  constructor(private store: Store<AppState>, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.curClub$ = this.store.select(selectCurrentClub);
  }

  isMyClubsTableRecord(element: LeagueTable, curClub: Club): boolean {
    return element.clubName === curClub.nameEn || element.clubName === curClub.nameRu;
  }

  showClubsRoster(clubName: string) {
    const dialogRef = this.dialog.open(PlayersListDialogComponent, {
      width: '500px',
      data: {clubName}
    });
  }
}
