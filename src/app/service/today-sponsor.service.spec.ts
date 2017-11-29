import { TestBed, inject } from '@angular/core/testing';

import { TodaySponsorService } from './today-sponsor.service';

describe('TodaySponsorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodaySponsorService]
    });
  });

  it('should be created', inject([TodaySponsorService], (service: TodaySponsorService) => {
    expect(service).toBeTruthy();
  }));
});
