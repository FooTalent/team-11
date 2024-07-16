import { TestBed } from '@angular/core/testing';

import { ActivateTokenService } from './activate-token.service';

describe('ActivateTokenService', () => {
  let service: ActivateTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivateTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
