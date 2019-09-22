import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AlertMessage } from './alert-message';
import { Balance } from './bank.model';

@Injectable({
  providedIn: 'root'
})
export class PincheckerService {
  currentBalance: number;
  
  constructor(private router: Router,
              private http: HttpClient) { }

  submitPINForChecks(pin: number) {
    if(this.validPIN(pin)) {
      this.confirmPIN(pin);
    }
  }

  private validPIN(pin: number): boolean {
    if(!isNaN(pin)) {
      if(Math.floor(pin.toString().length) === 4) {
        return true;
      } else {
        alert(AlertMessage.PinWrongLength);
      }
    } else {
      alert(AlertMessage.PinNan);
    }
    return false;
  }

  private confirmPIN(pin: number) {
    let pinToSend: string = pin.toString();
    console.log(pinToSend);
    let body = JSON.stringify({'pin': pinToSend});
    let headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    });
    console.log(body);
    this.http.post('https://frontend-challenge.screencloud-michael.now.sh/api/pin/', body, { headers }).subscribe((data: Balance) => {
      console.log(data.currentBalance);
      this.currentBalance = data.currentBalance;
      this.navigateToHome(data.currentBalance);
    }, (err: HttpErrorResponse) => {
      console.log(err);
      alert(AlertMessage.PinNotRecognised);
    });
  }

  private navigateToHome(currentBalance: number) {
    console.log("returned balance: £" + currentBalance);
    this.router.navigate(['/home']);
  }
}
