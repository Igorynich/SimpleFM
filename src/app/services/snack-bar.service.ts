import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  readonly DEFAULT_DURATION = 5000;
  readonly DEFAULT_POSITION: {
    horizontalPosition: MatSnackBarHorizontalPosition,
    verticalPosition: MatSnackBarVerticalPosition
  } = {
    horizontalPosition: 'center',
    verticalPosition: 'bottom'
  };

  constructor(private _snackBar: MatSnackBar) { }

  createSnackBar(message: string, action: string = 'OK', duration = this.DEFAULT_DURATION, position = this.DEFAULT_POSITION) {
    this._snackBar.open(message, action, {
      duration,
      horizontalPosition: position.horizontalPosition,
      verticalPosition: position.verticalPosition
    });
  }
}
