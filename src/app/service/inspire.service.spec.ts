import { TestBed, inject } from '@angular/core/testing';

import { InspireService } from './inspire.service';

describe('InspireService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InspireService]
    });
  });

  it('should be created', inject([InspireService], (service: InspireService) => {
    expect(service).toBeTruthy();
  }));
});
