import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewJobMainPageComponent } from './new-job-main-page.component';

describe('NewJobMainPageComponent', () => {
  let component: NewJobMainPageComponent;
  let fixture: ComponentFixture<NewJobMainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewJobMainPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewJobMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
