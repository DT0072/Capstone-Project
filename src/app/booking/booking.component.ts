import { Component } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  activebook: string = 'booking'; 

  openbooking(tab: string) {
    this.activebook = tab;
  }

}
