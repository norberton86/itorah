import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HokSearchComponent } from './hok-search.component';

describe('HokSearchComponent', () => {
  let component: HokSearchComponent;
  let fixture: ComponentFixture<HokSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HokSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HokSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
