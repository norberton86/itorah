import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupRegularComponent } from './popup-regular.component';

describe('PopupRegularComponent', () => {
  let component: PopupRegularComponent;
  let fixture: ComponentFixture<PopupRegularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupRegularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupRegularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
