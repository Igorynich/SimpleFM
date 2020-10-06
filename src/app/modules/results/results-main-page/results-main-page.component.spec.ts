import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsMainPageComponent } from './results-main-page.component';

describe('ResultsMainPageComponent', () => {
  let component: ResultsMainPageComponent;
  let fixture: ComponentFixture<ResultsMainPageComponent>;

  beforeEach(async(() => {
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
