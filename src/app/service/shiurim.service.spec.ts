import { TestBed, inject } from '@angular/core/testing';

import { ShiurimService } from './shiurim.service';

describe('ShiurimService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShiurimService]
    });
  });

  it('should be created', inject([ShiurimService], (service: ShiurimService) => {
    expect(service).toBeTruthy();
  }));
});
