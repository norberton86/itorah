import { TestBed, inject } from '@angular/core/testing';

import { HokService } from './hok.service';

describe('HokService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HokService]
    });
  });

  it('should be created', inject([HokService], (service: HokService) => {
    expect(service).toBeTruthy();
  }));
});
