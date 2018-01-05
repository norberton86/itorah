import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagerServerComponent } from './pager-server.component';

describe('PagerServerComponent', () => {
  let component: PagerServerComponent;
  let fixture: ComponentFixture<PagerServerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagerServerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagerServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
