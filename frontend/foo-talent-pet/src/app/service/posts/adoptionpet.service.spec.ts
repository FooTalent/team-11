import { TestBed } from '@angular/core/testing';

import { AdoptionpetService } from './adoptionpet.service';

describe('AdoptionpetService', () => {
  let service: AdoptionpetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdoptionpetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
