import { TestBed, inject } from '@angular/core/testing';

import { GemaraService } from './gemara.service';

describe('GemaraService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GemaraService]
    });
  });

  it('should be created', inject([GemaraService], (service: GemaraService) => {
    expect(service).toBeTruthy();
  }));
});
