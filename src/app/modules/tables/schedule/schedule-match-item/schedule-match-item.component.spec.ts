import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleMatchItemComponent } from './schedule-match-item.component';

describe('ScheduleMatchItemComponent', () => {
  let component: ScheduleMatchItemComponent;
  let fixture: ComponentFixture<ScheduleMatchItemComponent>;

  beforeEach(async(() => {
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
