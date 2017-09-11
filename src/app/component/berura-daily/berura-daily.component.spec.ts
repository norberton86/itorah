import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeruraDailyComponent } from './berura-daily.component';

describe('BeruraDailyComponent', () => {
  let component: BeruraDailyComponent;
  let fixture: ComponentFixture<BeruraDailyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeruraDailyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeruraDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
