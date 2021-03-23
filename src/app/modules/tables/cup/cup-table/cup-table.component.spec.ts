import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CupTableComponent } from './cup-table.component';

describe('CupTableComponent', () => {
  let component: CupTableComponent;
  let fixture: ComponentFixture<CupTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CupTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CupTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
