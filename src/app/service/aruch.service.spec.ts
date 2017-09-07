import { TestBed, inject } from '@angular/core/testing';

import { AruchService } from './aruch.service';

describe('AruchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AruchService]
    });
  });

  it('should be created', inject([AruchService], (service: AruchService) => {
    expect(service).toBeTruthy();
  }));
});
