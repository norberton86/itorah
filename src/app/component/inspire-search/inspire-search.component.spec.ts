import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspireSearchComponent } from './inspire-search.component';

describe('InspireSearchComponent', () => {
  let component: InspireSearchComponent;
  let fixture: ComponentFixture<InspireSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspireSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspireSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
