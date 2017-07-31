import { TestBed, inject } from '@angular/core/testing';

import { AnalitycService } from './analityc.service';

describe('AnalitycService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnalitycService]
    });
  });

  it('should be created', inject([AnalitycService], (service: AnalitycService) => {
    expect(service).toBeTruthy();
  }));
});
