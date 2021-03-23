import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FinanceMainPageComponent } from './finance-main-page.component';

describe('FinanceMainPageComponent', () => {
  let component: FinanceMainPageComponent;
  let fixture: ComponentFixture<FinanceMainPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceMainPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
