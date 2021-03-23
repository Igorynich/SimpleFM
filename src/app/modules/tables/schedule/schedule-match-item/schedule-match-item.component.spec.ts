import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScheduleMatchItemComponent } from './schedule-match-item.component';

describe('ScheduleMatchItemComponent', () => {
  let component: ScheduleMatchItemComponent;
  let fixture: ComponentFixture<ScheduleMatchItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleMatchItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleMatchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
