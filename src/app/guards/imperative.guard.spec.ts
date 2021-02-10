import { TestBed } from '@angular/core/testing';

import { ImperativeGuard } from './imperative.guard';

describe('ImperativeGuard', () => {
  let guard: ImperativeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ImperativeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
