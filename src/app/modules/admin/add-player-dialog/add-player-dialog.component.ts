import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../../../services/firebase.service';
import {MatDialogRef} from '@angular/material/dialog';
import {take} from 'rxjs/operators';
import {Club} from '../../../interfaces/club';
import {Player} from '../../../interfaces/player';

@Component({
  selector: 'app-add-player-dialog',
  templateUrl: './add-player-dialog.component.html',
  styleUrls: ['./add-player-dialog.component.css']
})
export class AddPlayerDialogComponent implements OnInit {
  clubList: Club[] = [];
  playerForm: FormGroup;
  positions = ['GK', 'D', 'M', 'F'];

  constructor(private fb: FormBuilder,
              private fs: FirebaseService,
              private dialogRef: MatDialogRef<AddPlayerDialogComponent>) { }

  ngOnInit(): void {
    this.playerForm = this.fb.group({
      altNameEn: ['', Validators.required],
      altNameRu: ['', Validators.required],
      club: ['', Validators.required],
      nameEn: ['', Validators.required],
      nameRu: ['', Validators.required],
      position: [null, Validators.required],
      power: [0, [Validators.required]]
    });
    this.fs.getClubs(false).pipe(take(1)).subscribe(clubs => {
      this.clubList = clubs;
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
      this.fs.addPlayer(playerData).subscribe(value => {
        console.log(value);
        this.dialogRef.close(true);
      });
    } else {
      console.log('InvalidForm ', this.playerForm);
    }
  }
}
