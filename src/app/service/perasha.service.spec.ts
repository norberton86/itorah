import { TestBed, inject } from '@angular/core/testing';

import { PerashaService } from './perasha.service';

describe('PerashaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PerashaService]
    });
  });

  it('should be created', inject([PerashaService], (service: PerashaService) => {
    expect(service).toBeTruthy();
  }));
});
