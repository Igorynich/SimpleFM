import { Injectable } from '@angular/core';
import {Remote, IpcRenderer, remote, ipcRenderer} from 'electron';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {

  private readonly electron;

  constructor() {
    this.electron = window.require('electron');
    console.log('Electron', this.electron);
  }

  get remote(): Remote {
    console.log('Get Remote', this.electron, this.electron.remote);
    return this.electron.remote;
  }

  get ipcRenderer(): IpcRenderer {
    return this.electron.ipcRenderer;
  }

  getRemote(): Remote {
    console.log('Get Remote func', this.electron, this.electron.remote);
    return this.electron.remote;
  }
}
