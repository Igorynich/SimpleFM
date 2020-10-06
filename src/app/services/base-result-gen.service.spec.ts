import { TestBed } from '@angular/core/testing';

import { BaseResultGenService } from './base-result-gen.service';

describe('BaseResultGenService', () => {
  let service: BaseResultGenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseResultGenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
