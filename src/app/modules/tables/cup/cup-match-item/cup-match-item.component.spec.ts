import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CupMatchItemComponent } from './cup-match-item.component';

describe('CupMatchItemComponent', () => {
  let component: CupMatchItemComponent;
  let fixture: ComponentFixture<CupMatchItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CupMatchItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CupMatchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
