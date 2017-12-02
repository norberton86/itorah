import { TestBed, inject } from '@angular/core/testing';

import { CommunitiesService } from './communities.service';

describe('CommunitiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommunitiesService]
    });
  });

  it('should be created', inject([CommunitiesService], (service: CommunitiesService) => {
    expect(service).toBeTruthy();
  }));
});
