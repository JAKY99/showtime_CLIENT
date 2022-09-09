import { TestBed } from '@angular/core/testing';

import { UserLocationDatasService } from './user-location-datas.service';

describe('UserLocationDatasService', () => {
  let service: UserLocationDatasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLocationDatasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
