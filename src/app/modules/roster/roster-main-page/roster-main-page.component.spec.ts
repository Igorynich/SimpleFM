import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RosterMainPageComponent } from './roster-main-page.component';

describe('RosterMainPageComponent', () => {
  let component: RosterMainPageComponent;
  let fixture: ComponentFixture<RosterMainPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RosterMainPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
