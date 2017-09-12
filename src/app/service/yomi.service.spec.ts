import { TestBed, inject } from '@angular/core/testing';

import { YomiService } from './yomi.service';

describe('YomiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YomiService]
    });
  });

  it('should be created', inject([YomiService], (service: YomiService) => {
    expect(service).toBeTruthy();
  }));
});
