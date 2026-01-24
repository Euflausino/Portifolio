import { Component, AfterViewInit } from '@angular/core';
declare const ScrollReveal: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    if (typeof ScrollReveal !== 'undefined') {
      ScrollReveal().reveal('.home__data');
      // ...other reveals...
    }
  }
}
