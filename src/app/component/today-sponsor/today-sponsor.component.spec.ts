import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaySponsorComponent } from './today-sponsor.component';

describe('TodaySponsorComponent', () => {
  let component: TodaySponsorComponent;
  let fixture: ComponentFixture<TodaySponsorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodaySponsorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaySponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
