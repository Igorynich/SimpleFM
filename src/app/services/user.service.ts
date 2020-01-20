import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // tslint:disable-next-line:variable-name
  private _adminName = '111';
  // tslint:disable-next-line:variable-name
  private _userName = '';

  constructor() { }

  set userName(value: string) {
    if (value) {
      this._userName = value.trim();
    }
  }

  get userName(): string {
    return this._userName;
  }

  isAdmin(): boolean {
    return this.userName === this._adminName;
  }
}
