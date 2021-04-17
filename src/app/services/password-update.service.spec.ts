import { TestBed } from '@angular/core/testing';

import { PasswordUpdateService } from './password-update.service';

describe('PasswordUpdateService', () => {
  let service: PasswordUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
