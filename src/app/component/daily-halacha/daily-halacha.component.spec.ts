import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyHalachaComponent } from './daily-halacha.component';

describe('DailyHalachaComponent', () => {
  let component: DailyHalachaComponent;
  let fixture: ComponentFixture<DailyHalachaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyHalachaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyHalachaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
