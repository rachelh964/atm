import { Component } from '@angular/core';
import { PincheckerService } from '../services/pinchecker.service';

@Component({
  selector: 'app-enter-pin',
  templateUrl: './enter-pin.component.html',
  styleUrls: ['./enter-pin.component.css']
})
export class EnterPinComponent {

  constructor(private pinchecker: PincheckerService) { }

  ngOnInit() { }

  checkPIN() {
    var pin = (document.getElementById('pin') as HTMLInputElement).value;
    this.pinchecker.submitPINForChecks(parseInt(pin));
  }
}
