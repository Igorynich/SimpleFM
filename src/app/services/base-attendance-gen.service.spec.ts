import { TestBed } from '@angular/core/testing';

import { BaseAttendanceGenService } from './base-attendance-gen.service';

describe('BaseAttendanceGenService', () => {
  let service: BaseAttendanceGenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseAttendanceGenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
