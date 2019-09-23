import { TestBed } from '@angular/core/testing';

import { WithdrawalCheckerService } from './withdrawal-checker.service';

describe('WithdrawalCheckerService', () => {
  var service: WithdrawalCheckerService;

  beforeEach(() => TestBed.configureTestingModule({}));
  beforeAll(() => {
    service = TestBed.get(WithdrawalCheckerService);
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should deny a withdrawal with letters instead of numbers', () => {
    expect(service['withdrawalIsValid'](Number.parseInt("test"), 220)).toBe(false);
  });

  it('should deny a withdrawal with a value of zero', () => {
    expect(service['withdrawalIsValid'](0, 220)).toBe(false);
  });

  it('should deny a withdrawal with a value of less than zero', () => {
    expect(service['withdrawalIsValid'](-10, 220)).toBe(false);
  });

  it('should deny a withdrawal with a value greater than can be withdrawn', () => {
    expect(service['withdrawalIsValid'](9001, 220)).toBe(false);
  });

  it('should accept a withdrawal that is valid', () => {
    expect(service['withdrawalIsValid'](50, 220)).toBe(true);
  });

  it('should round the withdrawal amount up if it is not divisible by five', () => {
    spyOn<any>(service, 'performWithdrawal');
    service.submitWithdrawalForChecks(2, 220);
    expect(service['performWithdrawal']).toHaveBeenCalled();
  });

  it('should call alert if going into overdraft', () => {
    spyOn<any>(service, 'approvedOverdraft');
    service.submitWithdrawalForChecks(300, 220);
    expect(service['approvedOverdraft']).toHaveBeenCalled();
  });

  it('should proceed with withdrawal if overdraft is approved', () => {
    spyOn<any>(service, 'approvedOverdraft').and.returnValue(true);
    spyOn<any>(service, 'performWithdrawal');
    service.submitWithdrawalForChecks(300, 220);
    expect(service['performWithdrawal']).toHaveBeenCalled();
  });
  
});
