import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchTooltipComponent } from './match-tooltip.component';

describe('MatchTooltipComponent', () => {
  let component: MatchTooltipComponent;
  let fixture: ComponentFixture<MatchTooltipComponent>;

  beforeEach(async(() => {
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
