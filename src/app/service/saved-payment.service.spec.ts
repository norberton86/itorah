import { TestBed, inject } from '@angular/core/testing';

import { SavedPaymentService } from './saved-payment.service';

describe('SavedPaymentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SavedPaymentService]
    });
  });

  it('should be created', inject([SavedPaymentService], (service: SavedPaymentService) => {
    expect(service).toBeTruthy();
  }));
});
