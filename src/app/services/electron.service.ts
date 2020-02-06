import { Injectable } from '@angular/core';
import {Remote, IpcRenderer, remote, ipcRenderer} from 'electron';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {

  // tslint:disable-next-line:variable-name
  private readonly _electron;

  constructor() {
    this._electron = window.require('electron');
    console.log('Electron', this.electron);
  }

  get remote(): Remote {
    return this.electron.remote;
  }

  get ipcRenderer(): IpcRenderer {
    return this.electron.ipcRenderer;
  }

  get electron() {
    return this._electron;
  }
}
