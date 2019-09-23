import { Injectable } from '@angular/core';
import { AlertMessage } from './alert-message';
import { BankService } from './bank.service';

@Injectable({
  providedIn: 'root'
})
export class WithdrawalCheckerService {
  
  constructor(private bankService: BankService) { }

  submitWithdrawalForChecks(withdrawAmount: number, currentBalance: number) {
    if(this.withdrawalIsValid(withdrawAmount, currentBalance)) {
      console.log("withdrawal is valid");
      if(withdrawAmount %5 != 0) {
        alert(AlertMessage.WdCoins);
        withdrawAmount = this.roundUpToNearestFive(withdrawAmount);
        console.log("withdrawal corrected to £" + withdrawAmount);
      }
      if(this.bankService.hasRequiredFunds(withdrawAmount)) {
        console.log("bank has required funds");
        if((withdrawAmount - currentBalance) > 0) {
          if(this.approvedOverdraft()) {
            this.performWithdrawal(withdrawAmount);
          }
        } else {
          this.performWithdrawal(withdrawAmount);
        }
      } else {
        alert(AlertMessage.BankLackingFunds);
      }
    }
  }

  private withdrawalIsValid(withdrawAmount: number, currentBalance: number) {
    if(isNaN(withdrawAmount)) {
      alert(AlertMessage.WdNan);
      return false;
    } else if(withdrawAmount === 0) {
      alert(AlertMessage.WdZero);
      return false;
    } else if(withdrawAmount < 0) {
      alert(AlertMessage.WdLessThanZero);
      return false;
    } else if((withdrawAmount - currentBalance) > 100) {
      alert(AlertMessage.WdTooMuch);
      return false;
    }
    return true;
  }

  private roundUpToNearestFive(withdrawAmount: number) {
    return Math.ceil(withdrawAmount / 5) * 5;
  }

  private performWithdrawal(withdrawAmount: number) {
    this.bankService.conductWithdrawal(withdrawAmount);
  }

  private approvedOverdraft() {
    return confirm(AlertMessage.WdOverdraft);
  }
}