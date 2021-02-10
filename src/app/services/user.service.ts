import {Injectable, Injector} from '@angular/core';
import {IpcRendererService} from './ipc-renderer.service';
import {environment} from '../../environments/environment';
import {Store} from '@ngrx/store';
import {AppState} from '../store/selectors/current-game.selectors';
import { logOut } from '../store/actions/current-game.actions';
import {Event, NavigationStart, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // tslint:disable-next-line:variable-name
  private _adminName = 'Igor Spiridenok';
  // tslint:disable-next-line:variable-name
  private _userName = '';
  env = environment;
  private ipcRenderer = null;

  lastNavigationStart: NavigationStart;

  constructor(private injector: Injector, private store: Store<AppState>, private router: Router) {
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

  trackNavigationStartEvents(): Observable<NavigationStart> {
    return this.router.events.pipe(filter(
      (event: Event) => {
        return (event instanceof NavigationStart);
      }
    ), map((value: NavigationStart) => {
      console.log(value);
      this.lastNavigationStart = value;
      return value;
    }));
  }

  isLastNavigationImperative(): boolean {
    return this.lastNavigationStart?.navigationTrigger === 'imperative';
  }
}
