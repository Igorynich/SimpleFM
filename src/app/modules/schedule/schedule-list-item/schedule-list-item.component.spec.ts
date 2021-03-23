import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScheduleListItemComponent } from './schedule-list-item.component';

describe('ScheduleListItemComponent', () => {
  let component: ScheduleListItemComponent;
  let fixture: ComponentFixture<ScheduleListItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
