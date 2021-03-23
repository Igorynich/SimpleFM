import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SeasonEndMainPageComponent } from './season-end-main-page.component';

describe('SeasonEndMainPageComponent', () => {
  let component: SeasonEndMainPageComponent;
  let fixture: ComponentFixture<SeasonEndMainPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonEndMainPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonEndMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
