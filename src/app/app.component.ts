import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {Event, NavigationStart, Router} from '@angular/router';
import {IpcRendererService} from './services/ipc-renderer.service';
import {environment} from '../environments/environment';
import {ROUTES} from './constants/routes';
import {LocationStrategy} from '@angular/common';
import {filter} from 'rxjs/operators';
import {UserService} from './services/user.service';
import {Subscription} from 'rxjs';
import {CleanSubscriptions} from './utils/clean-subscriptions';

@CleanSubscriptions()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'SimpleFM';
  env = environment;
  ipc = null;

  private _trackNavEventsSub: Subscription

  constructor(private router: Router, private injector: Injector, private userService: UserService) {
    /*history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });*/
  }

  ngOnInit(): void {
    this._trackNavEventsSub = this.userService.trackNavigationStartEvents().subscribe();
    /*this.router.events.pipe(filter(
      (event: Event) => {
        return(event instanceof NavigationStart);
      }
    )).subscribe((value: NavigationStart) => {
      console.log(value);
      if (value.navigationTrigger !== 'imperative') {

      }
    });*/

    if (this.env.electron) {
      this.ipc = this.injector.get(IpcRendererService) as IpcRendererService;

      this.ipc.onAdminTrayClick(() => {
        this.router.navigate([ROUTES.OFFICE, ROUTES.ADMIN]);
      });
      this.ipc.registerShortcut('CmdOrCtrl+Shift+F9', () => {
        this.router.navigate([ROUTES.OFFICE, ROUTES.ADMIN]);
      });
    }
    console.log('Ipc', this.ipc);
  }

  ngOnDestroy(): void {
    if (this.env.electron) {
      this.ipc.removeAllListeners();
    }
  }
}
