import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeruraComponent } from './berura.component';

describe('BeruraComponent', () => {
  let component: BeruraComponent;
  let fixture: ComponentFixture<BeruraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeruraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeruraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
