import { TestBed } from '@angular/core/testing';

import { GoogleAuthDetailsService } from './google-auth-details.service';

describe('GoogleAuthDetailsService', () => {
  let service: GoogleAuthDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleAuthDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
