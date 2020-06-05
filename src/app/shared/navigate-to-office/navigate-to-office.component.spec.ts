import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigateToOfficeComponent } from './navigate-to-office.component';

describe('NavigateToOfficeComponent', () => {
  let component: NavigateToOfficeComponent;
  let fixture: ComponentFixture<NavigateToOfficeComponent>;

  beforeEach(async(() => {
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
