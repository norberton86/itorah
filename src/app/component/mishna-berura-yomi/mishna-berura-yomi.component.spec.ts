import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MishnaBeruraYomiComponent } from './mishna-berura-yomi.component';

describe('MishnaBeruraYomiComponent', () => {
  let component: MishnaBeruraYomiComponent;
  let fixture: ComponentFixture<MishnaBeruraYomiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MishnaBeruraYomiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MishnaBeruraYomiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
