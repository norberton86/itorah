import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupEmergencyComponent } from './popup-emergency.component';

describe('PopupEmergencyComponent', () => {
  let component: PopupEmergencyComponent;
  let fixture: ComponentFixture<PopupEmergencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupEmergencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupEmergencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
