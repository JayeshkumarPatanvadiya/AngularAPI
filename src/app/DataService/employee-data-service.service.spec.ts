import { TestBed } from '@angular/core/testing';

import { EmployeeDataServiceService } from './employee-data-service.service';

describe('EmployeeDataServiceService', () => {
  let service: EmployeeDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
