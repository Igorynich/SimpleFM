import { TestBed } from '@angular/core/testing';

import { BaseGainsGenService } from './base-gains-gen.service';

describe('BaseGainsGenService', () => {
  let service: BaseGainsGenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseGainsGenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
