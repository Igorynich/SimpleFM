import {Component, Inject, OnInit} from '@angular/core';
import {Club} from '../../../interfaces/club';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../../../services/firebase.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {take} from 'rxjs/operators';
import {Player} from '../../../interfaces/player';
import {combineLatest} from 'rxjs';
import {POSITIONS} from '../../../constants/positions';

@Component({
  selector: 'app-edit-player-dialog',
  templateUrl: './edit-player-dialog.component.html',
  styleUrls: ['./edit-player-dialog.component.css']
})
export class EditPlayerDialogComponent implements OnInit {

  clubList: Club[] = [];
  loaded = false;
  playerForm: FormGroup;
  positions = POSITIONS;

  constructor(private fb: FormBuilder,
              private fs: FirebaseService,
              private dialogRef: MatDialogRef<EditPlayerDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
    combineLatest([this.fs.getClubs(false), this.fs.getPlayer(this.data)]).pipe(take(1)).subscribe(([clubs, player]) => {
      console.log('-----', clubs, player);
      this.clubList = clubs;
      const clubValue = clubs.find(value => value.nameEn === player.clubNameEn && value.nameRu === player.clubNameRu);
      this.playerForm = this.fb.group({
        altNameEn: [player.altNameEn],
        altNameRu: [player.altNameRu],
        club: [clubValue],
        nameEn: [player.nameEn, Validators.required],
        nameRu: [player.nameRu, Validators.required],
        position: [player.position, Validators.required],
        power: [player.power]
      });
      this.loaded = true;
    }, error => {
      console.error(error);
    });
  }

  onSubmit() {
    if (this.playerForm.valid && this.playerForm.dirty) {
      console.log('Submit ', this.playerForm.value);
      const playerData: Player = {
        altNameEn: this.playerForm.value.altNameEn,
        altNameRu: this.playerForm.value.altNameRu,
        club: `/clubs/${this.playerForm.value.club.id}`,
        clubNameEn: this.playerForm.value.club.nameEn,
        clubNameRu: this.playerForm.value.club.nameRu,
        nameEn: this.playerForm.value.nameEn,
        nameRu: this.playerForm.value.nameRu,
        position: this.playerForm.value.position,
        power: +this.playerForm.value.power
      };
      this.fs.updatePlayer(this.data, playerData).subscribe(value => {
        console.log(value);
        this.dialogRef.close(true);
      });
    } else {
      console.log('InvalidForm ', this.playerForm);
    }
  }
}
