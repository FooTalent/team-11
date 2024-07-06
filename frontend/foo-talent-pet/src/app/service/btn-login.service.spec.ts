import { TestBed } from '@angular/core/testing';

import { BtnLoginService } from './btn-login.service';

describe('BtnLoginService', () => {
  let service: BtnLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BtnLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
