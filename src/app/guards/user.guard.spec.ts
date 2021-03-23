import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { UserGuard } from './user.guard';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';

describe('UserGuard', () => {
  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useValue: routerSpy},
        UserService
      ]
    });
  });

  it('should ...', inject([UserGuard], (guard: UserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
