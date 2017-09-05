import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyResultComponent } from './weekly-result.component';

describe('WeeklyResultComponent', () => {
  let component: WeeklyResultComponent;
  let fixture: ComponentFixture<WeeklyResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
