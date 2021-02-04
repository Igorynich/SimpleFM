import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellPlayerDialogComponent } from './sell-player-dialog.component';

describe('SellPlayerDialogComponent', () => {
  let component: SellPlayerDialogComponent;
  let fixture: ComponentFixture<SellPlayerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellPlayerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellPlayerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
