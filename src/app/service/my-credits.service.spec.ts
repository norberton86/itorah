import { TestBed, inject } from '@angular/core/testing';

import { MyCreditsService } from './my-credits.service';

describe('MyCreditsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyCreditsService]
    });
  });

  it('should be created', inject([MyCreditsService], (service: MyCreditsService) => {
    expect(service).toBeTruthy();
  }));
});
