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
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PetQuestService', () => {
  let service: PetQuestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PetQuestService]
    });
    service = TestBed.inject(PetQuestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve endpoint data', () => {
    const endpoint = 'example-endpoint';
    const expectedData = { id: 1, name: 'Example Data' };

    service.getEndpointData(endpoint).subscribe(data => {
      expect(data).toEqual(expectedData);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}${endpoint}`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedData);
  });
});