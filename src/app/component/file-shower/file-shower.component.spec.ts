import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileShowerComponent } from './file-shower.component';

describe('FileShowerComponent', () => {
  let component: FileShowerComponent;
  let fixture: ComponentFixture<FileShowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileShowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileShowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
