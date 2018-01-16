import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayConfirmedComponent } from './pay-confirmed.component';

describe('PayConfirmedComponent', () => {
  let component: PayConfirmedComponent;
  let fixture: ComponentFixture<PayConfirmedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayConfirmedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
