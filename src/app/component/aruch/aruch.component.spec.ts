import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AruchComponent } from './aruch.component';

describe('AruchComponent', () => {
  let component: AruchComponent;
  let fixture: ComponentFixture<AruchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AruchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AruchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
