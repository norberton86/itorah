import { TestBed, inject } from '@angular/core/testing';

import { PeleService } from './pele.service';

describe('PeleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PeleService]
    });
  });

  it('should be created', inject([PeleService], (service: PeleService) => {
    expect(service).toBeTruthy();
  }));
});
