import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleMainPageComponent } from './schedule-main-page.component';

describe('ScheduleMainPageComponent', () => {
  let component: ScheduleMainPageComponent;
  let fixture: ComponentFixture<ScheduleMainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleMainPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
