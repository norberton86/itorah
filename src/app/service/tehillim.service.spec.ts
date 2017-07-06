import { TestBed, inject } from '@angular/core/testing';

import { TehillimService } from './tehillim.service';

describe('TehillimService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TehillimService]
    });
  });

  it('should be created', inject([TehillimService], (service: TehillimService) => {
    expect(service).toBeTruthy();
  }));
});
