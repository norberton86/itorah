import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmunahSearchComponent } from './emunah-search.component';

describe('EmunahSearchComponent', () => {
  let component: EmunahSearchComponent;
  let fixture: ComponentFixture<EmunahSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmunahSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmunahSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
