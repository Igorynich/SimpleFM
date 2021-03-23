import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResultsMainPageComponent } from './results-main-page.component';

describe('ResultsMainPageComponent', () => {
  let component: ResultsMainPageComponent;
  let fixture: ComponentFixture<ResultsMainPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsMainPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
