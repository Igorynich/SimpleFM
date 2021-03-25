import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionshipSeasonResultsComponent } from './championship-season-results.component';

describe('ChampionshipSeasonResultsComponent', () => {
  let component: ChampionshipSeasonResultsComponent;
  let fixture: ComponentFixture<ChampionshipSeasonResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampionshipSeasonResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampionshipSeasonResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
