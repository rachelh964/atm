import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  footnote: string;

  constructor() {
    this.footnote = "Your adventure starts here!";
  }
}
