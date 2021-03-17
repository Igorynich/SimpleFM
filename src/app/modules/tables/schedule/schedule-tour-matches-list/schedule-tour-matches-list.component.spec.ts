import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleTourMatchesListComponent } from './schedule-tour-matches-list.component';

describe('ScheduleTourMatchesListComponent', () => {
  let component: ScheduleTourMatchesListComponent;
  let fixture: ComponentFixture<ScheduleTourMatchesListComponent>;

  beforeEach(async(() => {
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
