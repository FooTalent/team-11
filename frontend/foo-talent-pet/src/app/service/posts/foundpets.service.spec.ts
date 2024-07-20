import { TestBed } from '@angular/core/testing';

import { FoundpetsService } from './foundpets.service';

describe('FoundpetsService', () => {
  let service: FoundpetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoundpetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
