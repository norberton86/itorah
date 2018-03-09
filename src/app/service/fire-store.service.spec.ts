import { TestBed, inject } from '@angular/core/testing';

import { FireStoreService } from './fire-store.service';

describe('FireStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FireStoreService]
    });
  });

  it('should be created', inject([FireStoreService], (service: FireStoreService) => {
    expect(service).toBeTruthy();
  }));
});
