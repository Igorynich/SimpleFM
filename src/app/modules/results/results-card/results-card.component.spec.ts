import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResultsCardComponent } from './results-card.component';

describe('ResultsCardComponent', () => {
  let component: ResultsCardComponent;
  let fixture: ComponentFixture<ResultsCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
