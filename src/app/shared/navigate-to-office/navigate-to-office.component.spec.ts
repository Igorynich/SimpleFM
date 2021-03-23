import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NavigateToOfficeComponent } from './navigate-to-office.component';

describe('NavigateToOfficeComponent', () => {
  let component: NavigateToOfficeComponent;
  let fixture: ComponentFixture<NavigateToOfficeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigateToOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigateToOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
