import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadShiriumComponent } from './download-shirium.component';

describe('DownloadShiriumComponent', () => {
  let component: DownloadShiriumComponent;
  let fixture: ComponentFixture<DownloadShiriumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadShiriumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadShiriumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
