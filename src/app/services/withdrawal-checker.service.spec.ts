import { TestBed } from '@angular/core/testing';

import { WithdrawalCheckerService } from './withdrawal-checker.service';

describe('WithdrawalCheckerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WithdrawalCheckerService = TestBed.get(WithdrawalCheckerService);
    expect(service).toBeTruthy();
  });
});
