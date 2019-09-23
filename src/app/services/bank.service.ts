import { Injectable } from '@angular/core';
import { Withdrawal } from './bank.model';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  private currentBalance: number;
  private fivers: number;
  private tenners: number;
  private twenties: number;
  withdrawals: Withdrawal[];

  constructor() {
    this.fivers = 4;
    this.tenners = 15;
    this.twenties = 7;
    this.withdrawals = [];
  }

  setCurrentBalance(balance: number) {
    this.currentBalance = balance;
  }

  getCurrentBalance() {
    return this.currentBalance;
  }

  getWithdrawals() {
    return this.withdrawals;
  }

  conductWithdrawal(withdrawalAmount: number) {
    var withdrawal: Withdrawal = new Withdrawal();
    withdrawal.amount = withdrawalAmount;
    this.currentBalance -= withdrawalAmount;
    console.log("new balance is £" + this.currentBalance);
    this.dispenseNotes(withdrawalAmount, withdrawal);
  }

  dispenseNotes(withdrawalAmount: number, withdrawal: Withdrawal) {
    while(withdrawalAmount > 0) {
      if(withdrawalAmount - 20 >= 0 && this.twenties > 0 && this.twenties > (this.tenners / 2)) {
        this.twenties -= 1;
        withdrawalAmount -= 20;
        withdrawal.addNote(20);
        console.log("£20 dispensed, " + this.twenties + " left.");
      }
      if(withdrawalAmount - 10 >= 0 && this.tenners > 0) {
        this.tenners -= 1;
        withdrawalAmount -= 10;
        withdrawal.addNote(10);
        console.log("£10 dispensed, " + this.tenners + " left.");
      }
      if((withdrawalAmount - 5 >= 0 && this.fivers > 2)
      || this.twenties < 2 && this.tenners < 2 && this.fivers > 0
      || withdrawalAmount - 5 === 0 && this.fivers > 0) {
        this.fivers -= 1;
        withdrawalAmount -= 5;
        withdrawal.addNote(5);
        console.log("£5 dispensed, " + this.fivers + " left.");
      }
    }
    this.withdrawals.push(withdrawal);
  }

  getCurrentFunds() {
    var funds: number = 0;
    let i = 0;
    while(i < this.fivers) {
      funds += 5;
      i++;
    }
    i = 0;
    while(i < this.tenners) {
      funds += 10;
      i++;
    }
    i = 0;
    while(i < this.twenties) {
      funds += 20;
      i++;
    }
    console.log("current funds within the atm are £" + funds);
    return funds;
  }

  hasRequiredFunds(withdrawalAmount: number) {
    return (withdrawalAmount < this.getCurrentFunds()) && this.hasEnoughFivers(withdrawalAmount);
  }
  
  private hasEnoughFivers(withdrawalAmount: number) {
    if(withdrawalAmount % 10 == 5) {
      return this.fivers > 0;
    }
    return true;
  }
}
