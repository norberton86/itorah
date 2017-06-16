import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklySearchComponent } from './weekly-search.component';

describe('WeeklySearchComponent', () => {
  let component: WeeklySearchComponent;
  let fixture: ComponentFixture<WeeklySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
