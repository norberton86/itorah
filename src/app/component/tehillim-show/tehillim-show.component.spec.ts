import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TehillimShowComponent } from './tehillim-show.component';

describe('TehillimShowComponent', () => {
  let component: TehillimShowComponent;
  let fixture: ComponentFixture<TehillimShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TehillimShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TehillimShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
