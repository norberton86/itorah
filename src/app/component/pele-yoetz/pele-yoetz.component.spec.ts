import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeleYoetzComponent } from './pele-yoetz.component';

describe('PeleYoetzComponent', () => {
  let component: PeleYoetzComponent;
  let fixture: ComponentFixture<PeleYoetzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeleYoetzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeleYoetzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
