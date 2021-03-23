import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScheduleTourMatchesListComponent } from './schedule-tour-matches-list.component';

describe('ScheduleTourMatchesListComponent', () => {
  let component: ScheduleTourMatchesListComponent;
  let fixture: ComponentFixture<ScheduleTourMatchesListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleTourMatchesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleTourMatchesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
