import { Injectable } from '@angular/core';
import {IpcRendererService} from './ipc-renderer.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // tslint:disable-next-line:variable-name
  private _adminName = '111';
  // tslint:disable-next-line:variable-name
  private _userName = '';

  constructor(private ipcRenderer: IpcRendererService) { }

  set userName(value: string) {
    this._userName = value.trim();
    this.ipcRenderer.showAdminTrayIcon(this.isAdmin());
    console.log('_username', this._userName);
  }

  get userName(): string {
    return this._userName;
  }

  isAdmin(): boolean {
    return this.userName === this._adminName;
  }

  isLogged() {
    return !!this.userName;
  }

  logOut() {
    this.userName = '';
  }
}
