import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseService} from '../../../services/firebase.service';
import {MatDialogRef} from '@angular/material/dialog';
import {Club} from '../../../interfaces/club';
import {League} from '../../../interfaces/league';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-add-club-dialog',
  templateUrl: './add-club-dialog.component.html',
  styleUrls: ['./add-club-dialog.component.css']
})
export class AddClubDialogComponent implements OnInit {
  leagueList: League[] = [];
  clubForm: FormGroup;

  constructor(private fb: FormBuilder,
              private fs: FirebaseService,
              private dialogRef: MatDialogRef<AddClubDialogComponent>) { }

  ngOnInit(): void {
    this.clubForm = this.fb.group({
      altNameEn: ['', Validators.required],
      altNameRu: ['', Validators.required],
      budget: [0, Validators.required],
      league: ['', Validators.required],
      nameEn: ['', Validators.required],
      nameRu: ['', Validators.required],
      stadium: [1000, Validators.required],
    });
    this.fs.getLeagues(false).pipe(take(1)).subscribe(leagues => {
      this.leagueList = leagues;
    });
  }

  onSubmit() {
    if (this.clubForm.valid && this.clubForm.dirty) {
      console.log('Submit ', this.clubForm.value);
      const clubData: Club = {
        altNameEn: this.clubForm.value.altNameEn,
        altNameRu: this.clubForm.value.altNameRu,
        budget: +this.clubForm.value.budget,
        league: `/leagues/${this.clubForm.value.league.id}`,
        leagueNameEn: this.clubForm.value.league.nameEn,
        leagueNameRu: this.clubForm.value.league.nameRu,
        nameEn: this.clubForm.value.nameEn,
        nameRu: this.clubForm.value.nameRu,
        stadium: +this.clubForm.value.stadium
      };
      this.fs.addClub(clubData).subscribe(value => {
        console.log(value);
        this.dialogRef.close(true);
      });
    } else {
      console.log('InvalidForm ', this.clubForm);
    }
  }
}
