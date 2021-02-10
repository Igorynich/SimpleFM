import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonEndMainPageComponent } from './season-end-main-page.component';

describe('SeasonEndMainPageComponent', () => {
  let component: SeasonEndMainPageComponent;
  let fixture: ComponentFixture<SeasonEndMainPageComponent>;

  beforeEach(async(() => {
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
