import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferMarketPlayerItemComponent } from './transfer-market-player-item.component';

describe('TransferMarketPlayerItemComponent', () => {
  let component: TransferMarketPlayerItemComponent;
  let fixture: ComponentFixture<TransferMarketPlayerItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferMarketPlayerItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferMarketPlayerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
