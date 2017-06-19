import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnTorahComponent } from './learn-torah.component';

describe('LearnTorahComponent', () => {
  let component: LearnTorahComponent;
  let fixture: ComponentFixture<LearnTorahComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearnTorahComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnTorahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
