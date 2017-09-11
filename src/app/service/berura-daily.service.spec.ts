import { TestBed, inject } from '@angular/core/testing';

import { BeruraDailyService } from './berura-daily.service';

describe('BeruraDailyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BeruraDailyService]
    });
  });

  it('should be created', inject([BeruraDailyService], (service: BeruraDailyService) => {
    expect(service).toBeTruthy();
  }));
});
