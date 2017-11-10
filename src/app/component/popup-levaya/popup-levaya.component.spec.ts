import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupLevayaComponent } from './popup-levaya.component';

describe('PopupLevayaComponent', () => {
  let component: PopupLevayaComponent;
  let fixture: ComponentFixture<PopupLevayaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupLevayaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupLevayaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
