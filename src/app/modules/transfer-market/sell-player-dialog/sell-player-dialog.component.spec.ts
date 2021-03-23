import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SellPlayerDialogComponent } from './sell-player-dialog.component';

describe('SellPlayerDialogComponent', () => {
  let component: SellPlayerDialogComponent;
  let fixture: ComponentFixture<SellPlayerDialogComponent>;

  beforeEach(waitForAsync(() => {
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
