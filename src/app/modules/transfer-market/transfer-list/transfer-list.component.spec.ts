import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TransferListComponent } from './transfer-list.component';

describe('TransferListComponent', () => {
  let component: TransferListComponent;
  let fixture: ComponentFixture<TransferListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
