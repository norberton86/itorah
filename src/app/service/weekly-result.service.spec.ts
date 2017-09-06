import { TestBed, inject } from '@angular/core/testing';

import { WeeklyResultService } from './weekly-result.service';

describe('WeeklyResultService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeeklyResultService]
    });
  });

  it('should be created', inject([WeeklyResultService], (service: WeeklyResultService) => {
    expect(service).toBeTruthy();
  }));
});
