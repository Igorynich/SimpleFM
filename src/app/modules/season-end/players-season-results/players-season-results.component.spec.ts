import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersSeasonResultsComponent } from './players-season-results.component';

describe('PlayersSeasonResultsComponent', () => {
  let component: PlayersSeasonResultsComponent;
  let fixture: ComponentFixture<PlayersSeasonResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayersSeasonResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersSeasonResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
