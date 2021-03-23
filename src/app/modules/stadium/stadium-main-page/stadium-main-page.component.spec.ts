import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StadiumMainPageComponent } from './stadium-main-page.component';

describe('StadiumMainPageComponent', () => {
  let component: StadiumMainPageComponent;
  let fixture: ComponentFixture<StadiumMainPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StadiumMainPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StadiumMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
