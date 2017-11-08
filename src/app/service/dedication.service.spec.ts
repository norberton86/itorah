import { TestBed, inject } from '@angular/core/testing';

import { DedicationService } from './dedication.service';

describe('DedicationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DedicationService]
    });
  });

  it('should be created', inject([DedicationService], (service: DedicationService) => {
    expect(service).toBeTruthy();
  }));
});
