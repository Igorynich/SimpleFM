import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StorageService} from '../../services/storage.service';
import {FirebaseService} from '../../services/firebase.service';
import {mapReplacer, mapReviver} from '../../utils/local-storage';
import {Store} from '@ngrx/store';
import {AppState, selectCurrentGameState} from '../../store/selectors/current-game.selectors';
import {switchMap, take} from 'rxjs/operators';
import {LZString} from '../../utils/lz-string';

@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.css']
})
export class FeedbackDialogComponent implements OnInit {

  form: FormGroup;

  constructor(private dialogRef: MatDialogRef<FeedbackDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {type: 'bug' | 'feedback'},
              private fb: FormBuilder,
              private storage: StorageService,
              private firebase: FirebaseService,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      text: ['', Validators.required]
    });
  }

  send() {
    if (this.data.type === 'bug') {
      this.store.select(selectCurrentGameState).pipe(take(1), switchMap(state => {
        const {countries, leagues, players, clubs, scheduleShells, stats, transfers, ...dataToSend} = state;
        /*const mapReplacedData = {
          ...dataToSend,
          finances: Array.from(dataToSend.finances.entries()),
          seasonData: {
            clubPowers: Array.from(dataToSend.seasonData.clubPowers.entries()),
            ticketPrices: Array.from(dataToSend.seasonData.ticketPrices.entries())
          }
        };*/
        // const compressed = lzwCompress.pack(mapReplacedData);
        const compressedData: string = LZString.compressToBase64(JSON.stringify(dataToSend, mapReplacer));
        const compressedStat: string = LZString.compressToBase64(JSON.stringify(stats, mapReplacer));
        const compressedTransfers: string = LZString.compressToBase64(JSON.stringify(transfers, mapReplacer));
        console.warn('LZW DATA', compressedData);
        console.warn('LZW STATS', compressedStat);
        console.warn('LZW TRANSFERS', compressedTransfers);
        // console.warn('LZW 2', lzwCompress.unpack(compressed));
        // console.warn('LZW 2', JSON.parse(this.lz.decompress(compressed), mapReviver));
        // console.warn('LZW1', lzwCompress.pack(JSON.stringify(dataToSend, mapReplacer)));
        console.warn('LZW 2 DATA', JSON.parse(LZString.decompressFromBase64(compressedData), mapReviver));
        console.warn('LZW 2 STATS', JSON.parse(LZString.decompressFromBase64(compressedStat), mapReviver));
        console.warn('LZW 2 TRANSFERS', JSON.parse(LZString.decompressFromBase64(compressedTransfers), mapReviver));
        return this.firebase.addBugReport({text: this.form.get('text').value,
          save: {data: compressedData, stats: compressedStat, transfers: compressedTransfers}});
      })).subscribe();
    } else if (this.data.type === 'feedback') {
      this.firebase.addFeedback({text: this.form.get('text').value}).subscribe();
    }
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
