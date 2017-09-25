import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadSearchComponent } from './read-search.component';

describe('ReadSearchComponent', () => {
  let component: ReadSearchComponent;
  let fixture: ComponentFixture<ReadSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
