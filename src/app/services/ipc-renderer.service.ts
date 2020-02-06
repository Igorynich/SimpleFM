import {Injectable, NgZone} from '@angular/core';
import {ElectronService} from './electron.service';
import {IpcRenderer} from 'electron';
import IpcRendererEvent = Electron.IpcRendererEvent;
import Accelerator = Electron.Accelerator;
import Remote = Electron.Remote;

@Injectable({
  providedIn: 'root'
})
export class IpcRendererService {

  private ipcRenderer: IpcRenderer;
  private remote: Remote;

  constructor(private electron: ElectronService, private ngZone: NgZone) {
    this.ipcRenderer = electron.ipcRenderer;
    this.remote = electron.remote;
  }

  on(channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) {
    this.ipcRenderer.on(channel, listener);
  }

  onReady(listener) {
    this.on('ready', listener);
  }

  // TODO: проверить на уже наличие такой регистрации
  registerShortcut(shortcut: Accelerator, callback) {
    console.log('Registering Shortcut', shortcut, callback);
    // this.ipcRenderer.send('register-shortcut', shortcut, callback);
    const suc = this.remote.globalShortcut.register(shortcut, () => {
      this.ngZone.run(callback);
    });
    console.log('Registered?', suc);
  }
}
