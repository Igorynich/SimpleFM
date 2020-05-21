import { TestBed } from '@angular/core/testing';

import { IpcRendererService } from './ipc-renderer.service';
import {environment} from '../../environments/environment';
import {ElectronService} from './electron.service';
import {NgZone} from '@angular/core';

describe('IpcRendererService', () => {
  beforeEach(() => {
    const ngZoneSpy = jasmine.createSpyObj('ngZone', ['run']);
    TestBed.configureTestingModule({
      providers: [
        ElectronService,
        {provide: NgZone, useClass: ngZoneSpy}
      ]
    });
  });

  if (environment.electron) {
    it('should be created', () => {
      const service: IpcRendererService = TestBed.get(IpcRendererService);
      expect(service).toBeTruthy();
    });
  }

});
