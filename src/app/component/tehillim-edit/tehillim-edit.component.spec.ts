import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TehillimEditComponent } from './tehillim-edit.component';

describe('TehillimEditComponent', () => {
  let component: TehillimEditComponent;
  let fixture: ComponentFixture<TehillimEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TehillimEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TehillimEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
