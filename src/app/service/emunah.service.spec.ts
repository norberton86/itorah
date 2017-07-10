import { TestBed, inject } from '@angular/core/testing';

import { EmunahService } from './emunah.service';

describe('EmunahService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmunahService]
    });
  });

  it('should be created', inject([EmunahService], (service: EmunahService) => {
    expect(service).toBeTruthy();
  }));
});
