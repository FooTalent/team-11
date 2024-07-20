import { TestBed } from '@angular/core/testing';

import { FuncionLoginService } from './funcion-login.service';

describe('FuncionLoginService', () => {
  let service: FuncionLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuncionLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
