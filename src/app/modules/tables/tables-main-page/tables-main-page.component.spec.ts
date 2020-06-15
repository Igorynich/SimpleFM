import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesMainPageComponent } from './tables-main-page.component';

describe('TablesMainPageComponent', () => {
  let component: TablesMainPageComponent;
  let fixture: ComponentFixture<TablesMainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablesMainPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
