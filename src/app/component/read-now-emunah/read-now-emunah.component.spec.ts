import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadNowEmunahComponent } from './read-now-emunah.component';

describe('ReadNowEmunahComponent', () => {
  let component: ReadNowEmunahComponent;
  let fixture: ComponentFixture<ReadNowEmunahComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadNowEmunahComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadNowEmunahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
