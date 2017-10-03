import { TestBed, inject } from '@angular/core/testing';

import { MIshnaService } from './mishna.service';

describe('MIshnaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MIshnaService]
    });
  });

  it('should be created', inject([MIshnaService], (service: MIshnaService) => {
    expect(service).toBeTruthy();
  }));
});
