import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {IpcRendererService} from './services/ipc-renderer.service';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'SimpleFM';
  env = environment;
  ipc = null;

  constructor(private router: Router, private injector: Injector) {
  }

  ngOnInit(): void {
    /*this.router.events.subscribe(value => {
      console.log(value);
    });*/

    if (this.env.electron) {
      this.ipc = this.injector.get(IpcRendererService) as IpcRendererService;

      this.ipc.onReady(() => {
        console.log('READY');
      });

      this.ipc.onAdminTrayClick(() => {
        this.router.navigate(['office', 'admin']);
      });
      this.ipc.registerShortcut('CmdOrCtrl+Shift+F9', () => {
        this.router.navigate(['office', 'admin']);
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
