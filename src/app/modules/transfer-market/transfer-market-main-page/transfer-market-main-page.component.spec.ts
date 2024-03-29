import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TransferMarketMainPageComponent } from './transfer-market-main-page.component';

describe('TransferMarketMainPageComponent', () => {
  let component: TransferMarketMainPageComponent;
  let fixture: ComponentFixture<TransferMarketMainPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferMarketMainPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferMarketMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
