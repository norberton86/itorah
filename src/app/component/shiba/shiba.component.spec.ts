import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShibaComponent } from './shiba.component';

describe('ShibaComponent', () => {
  let component: ShibaComponent;
  let fixture: ComponentFixture<ShibaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShibaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShibaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
