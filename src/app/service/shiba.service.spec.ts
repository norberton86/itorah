import { TestBed, inject } from '@angular/core/testing';

import { ShibaService } from './shiba.service';

describe('ShibaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShibaService]
    });
  });

  it('should be created', inject([ShibaService], (service: ShibaService) => {
    expect(service).toBeTruthy();
  }));
});
