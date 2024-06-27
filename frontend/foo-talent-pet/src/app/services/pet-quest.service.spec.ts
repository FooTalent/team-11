import { TestBed } from '@angular/core/testing';

import { PetQuestService } from './pet-quest.service';

describe('PetQuestService', () => {
  let service: PetQuestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetQuestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
