import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLeagueDialogComponent } from './edit-league-dialog.component';

describe('EditLeagueDialogComponent', () => {
  let component: EditLeagueDialogComponent;
  let fixture: ComponentFixture<EditLeagueDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLeagueDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLeagueDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
