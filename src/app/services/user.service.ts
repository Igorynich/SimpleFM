import {Injectable, Injector} from '@angular/core';
import {IpcRendererService} from './ipc-renderer.service';
import {environment} from '../../environments/environment';
import {Store} from '@ngrx/store';
import {AppState} from '../store/selectors/current-game.selectors';
import { logOut } from '../store/actions/current-game.actions';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // tslint:disable-next-line:variable-name
  private _adminName = '111';
  // tslint:disable-next-line:variable-name
  private _userName = '';
  env = environment;
  private ipcRenderer = null;

  constructor(private injector: Injector, private store: Store<AppState>) {
    if (this.env.electron) {
      this.ipcRenderer = this.injector.get(IpcRendererService) as IpcRendererService;
    }
  }

  set userName(value: string) {
    this._userName = value.trim();
    if (this.ipcRenderer) {
      this.ipcRenderer.showAdminTrayIcon(this.isAdmin());
    }
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
    this.store.dispatch(logOut());
  }
}
