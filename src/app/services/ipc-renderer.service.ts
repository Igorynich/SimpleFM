import {Injectable, NgZone} from '@angular/core';
import {ElectronService} from './electron.service';
import {IpcRenderer} from 'electron';
import IpcRendererEvent = Electron.IpcRendererEvent;
import Accelerator = Electron.Accelerator;
import Remote = Electron.Remote;
import {Channels} from '../constants/channels';

@Injectable({
  providedIn: 'root'
})
export class IpcRendererService {

  private ipcRenderer: IpcRenderer;
  private remote: Remote;
  private electron;

  constructor(private electronService: ElectronService, private ngZone: NgZone) {
    this.ipcRenderer = electronService.ipcRenderer;
    this.remote = electronService.remote;
    this.electron = electronService.electron;
  }

  on(channel: string, listener: (event: IpcRendererEvent, ...args: any[]) => void) {
    this.ipcRenderer.on(channel, () => this.ngZone.run(listener));
  }

  onReady(listener) {
    this.on(Channels.Ready, listener);
    this.addContextMenu();
  }

  onAdminTrayClick(listener) {
    this.on(Channels.AdminTrayClick, listener);
  }

  send(channel: string, ...args: any[]) {
    this.ipcRenderer.send(channel, ...args);
  }

  removeAllListeners() {
    // @ts-ignore
    const channelsStringArray = Object.keys(Channels).map(key => Channels[key]);
    channelsStringArray.forEach(value => {
      this.ipcRenderer.removeAllListeners(value);
    });
  }

  addContextMenu() {
    let rightClickPosition = null;

    const menu = this.remote.Menu.buildFromTemplate([{
      label: 'Inspect Element',
      click: () => {
        this.remote.getCurrentWindow().webContents.inspectElement(rightClickPosition.x, rightClickPosition.y);
      }
    }]);
    /*const menu = new Menu();
    const menuItem = new MenuItem({
      label: 'Inspect Element',
      click: () => {
        this.remote.getCurrentWindow().webContents.inspectElement(rightClickPosition.x, rightClickPosition.y);
      }
    });
    menu.append(menuItem);*/

    window.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      rightClickPosition = {x: e.x, y: e.y};
      menu.popup({
        window: this.remote.getCurrentWindow(),
        ...rightClickPosition
      });
    }, false);
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

  showAdminTrayIcon(doIt: boolean) {
    this.send(Channels.ShowAdminTrayIcon, doIt);
  }


}
