import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {IpcRendererService} from './services/ipc-renderer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'SimpleFM';

  constructor(private router: Router, private ipc: IpcRendererService) {
  }

  ngOnInit(): void {
    /*this.router.events.subscribe(value => {
      console.log(value);
    });*/
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

  ngOnDestroy(): void {
    this.ipc.removeAllListeners();
  }
}
