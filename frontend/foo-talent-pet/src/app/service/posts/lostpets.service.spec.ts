import { TestBed } from '@angular/core/testing';

import { LostpetsService } from './lostpets.service';

describe('LostpetsService', () => {
  let service: LostpetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LostpetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
