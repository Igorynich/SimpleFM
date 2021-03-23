import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatchTooltipComponent } from './match-tooltip.component';

describe('MatchTooltipComponent', () => {
  let component: MatchTooltipComponent;
  let fixture: ComponentFixture<MatchTooltipComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchTooltipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
