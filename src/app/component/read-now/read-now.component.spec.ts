import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadNowComponent } from './read-now.component';

describe('ReadNowComponent', () => {
  let component: ReadNowComponent;
  let fixture: ComponentFixture<ReadNowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadNowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
