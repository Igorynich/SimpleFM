import { TestBed } from '@angular/core/testing';

import { ElectronService } from './electron.service';
import {environment} from '../../environments/environment';

describe('ElectronService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  if (environment.electron) {
    it('should be created', () => {
      const service: ElectronService = TestBed.get(ElectronService);
      expect(service).toBeTruthy();
    });
  }
});
