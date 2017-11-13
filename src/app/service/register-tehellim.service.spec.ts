import { TestBed, inject } from '@angular/core/testing';

import { RegisterTehellimService } from './register-tehellim.service';

describe('RegisterTehellimService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisterTehellimService]
    });
  });

  it('should be created', inject([RegisterTehellimService], (service: RegisterTehellimService) => {
    expect(service).toBeTruthy();
  }));
});
