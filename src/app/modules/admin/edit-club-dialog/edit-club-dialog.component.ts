import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FirebaseService} from '../../../services/firebase.service';
import {combineLatest, Subscription} from 'rxjs';
import {League} from '../../../interfaces/league';
import {Club} from '../../../interfaces/club';
import {CleanSubscriptions} from '../../../utils/clean-subscriptions';
import {take} from 'rxjs/operators';

@CleanSubscriptions()
@Component({
  selector: 'app-edit-club-dialog',
  templateUrl: './edit-club-dialog.component.html',
  styleUrls: ['./edit-club-dialog.component.css']
})
export class EditClubDialogComponent implements OnInit, OnDestroy {
  leagueList: League[] = [];
  clubForm: FormGroup;
  loaded = false;

  private _combineSub: Subscription;
  private _updSub: Subscription;

  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: string,
              private dialogRef: MatDialogRef<EditClubDialogComponent>,
              private fs: FirebaseService) { }

  ngOnInit() {
    this._combineSub = combineLatest([this.fs.getLeagues(false), this.fs.getClub(this.data)]).pipe(take(1)).subscribe(([leagues, club]) => {
      console.log('-----', leagues, club);
      this.leagueList = leagues;
      const leagueValue = leagues.find(value => value.nameEn === club.leagueNameEn && value.nameRu === club.leagueNameRu);
      this.clubForm = this.fb.group({
        altNameEn: [club.altNameEn],
        altNameRu: [club.altNameRu],
        budget: [club.budget, Validators.required],
        league: [leagueValue],
        nameEn: [club.nameEn, Validators.required],
        nameRu: [club.nameRu, Validators.required],
        stadium: [club.stadium, Validators.required]
      });
      this.loaded = true;
    }, error => {
      console.error(error);
    });
  }

  ngOnDestroy(): void {
  }

  // Maybe transfer this logic to service?
  onSubmit() {
    if (this.clubForm.valid && this.clubForm.dirty) {
      console.log('Submit ', this.clubForm.value);
      const clubData: Club = {
        altNameEn: this.clubForm.value.altNameEn,
        altNameRu: this.clubForm.value.altNameRu,
        budget: this.clubForm.value.budget,
        league: `/leagues/${this.clubForm.value.league.id}`,
        leagueNameEn: this.clubForm.value.league.nameEn,
        leagueNameRu: this.clubForm.value.league.nameRu,
        nameEn: this.clubForm.value.nameEn,
        nameRu: this.clubForm.value.nameRu,
        stadium: this.clubForm.value.stadium
      };
      this._updSub = this.fs.updateClub(this.data, clubData).subscribe(value => {
        console.log(value);
        this.dialogRef.close(true);
      });
    } else {
      console.log('InvalidForm ', this.clubForm);
    }
  }


}
