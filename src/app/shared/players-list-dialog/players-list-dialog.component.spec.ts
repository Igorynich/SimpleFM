import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlayersListDialogComponent } from './players-list-dialog.component';

describe('PlayersListDialogComponent', () => {
  let component: PlayersListDialogComponent;
  let fixture: ComponentFixture<PlayersListDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayersListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
