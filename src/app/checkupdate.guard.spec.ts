import { TestBed } from '@angular/core/testing';

import { CheckupdateGuard } from './checkupdate.guard';

describe('CheckupdateGuard', () => {
  let guard: CheckupdateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckupdateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
