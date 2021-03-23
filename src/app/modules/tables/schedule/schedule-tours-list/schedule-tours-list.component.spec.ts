import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScheduleToursListComponent } from './schedule-tours-list.component';

describe('ScheduleToursListComponent', () => {
  let component: ScheduleToursListComponent;
  let fixture: ComponentFixture<ScheduleToursListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleToursListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleToursListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
