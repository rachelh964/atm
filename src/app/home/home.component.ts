import { Component } from '@angular/core';
import { WithdrawalCheckerService } from '../services/withdrawal-checker.service';
import { BankService } from '../services/bank.service';
import { PincheckerService } from '../services/pinchecker.service';
import { Withdrawal } from '../services/bank.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  withdrawAmount: number = 0;
  currentBalance: number;
  withdrawals: Withdrawal[];

  constructor(private withdrawalChecker: WithdrawalCheckerService,
              private bankService: BankService,
              private pinChecker: PincheckerService,
              private router: Router) { 
    this.currentBalance = this.pinChecker.currentBalance;
    if(this.currentBalance === null || isNaN(this.currentBalance)) {
      this.router.navigate(['/']);
    }
    this.bankService.setCurrentBalance(this.currentBalance);
    this.withdrawals = [];
  }

  ngOnInit() {
  }

  withdraw() {
    this.withdrawAmount = parseInt((document.getElementById('withdrawal') as HTMLInputElement).value);
    console.log("conducting withdrawal of £" + this.withdrawAmount);
    this.withdrawalChecker.submitWithdrawalForChecks(this.withdrawAmount, this.currentBalance);
    this.currentBalance = this.bankService.getCurrentBalance();
    this.withdrawals = this.bankService.getWithdrawals();
  }
}
