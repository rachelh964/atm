import { TestBed } from '@angular/core/testing';

import { BankService } from './bank.service';

describe('BankService', () => {
  var service: BankService;
  beforeEach(() => TestBed.configureTestingModule({}));
  beforeAll(() => {
    service = TestBed.get(BankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to set and get current balance', () => {
    service.setCurrentBalance(220);
    expect(service.getCurrentBalance()).toEqual(220);
  });

  it('should be able to conduct a withdrawal', () => {
    service.conductWithdrawal(20);
    expect(service.getWithdrawals().length).toBe(1);
  });

  it('should deplete the bank funds by the correct amount when a withdrawal occurs', () => {
    var initialFunds = service.getCurrentFunds();
    service.conductWithdrawal(20);
    expect(service.getCurrentFunds() + 20).toEqual(initialFunds);
  });

  it('should deny a withdrawal of a value greater than the amount in the funds', () => {
    expect(service.hasRequiredFunds(9001)).toBe(false);
  })

  it('should allow a withdrawal of a value less than the amount in the funds', () => {
    expect(service.hasRequiredFunds(5)).toBe(true);
  })
});
