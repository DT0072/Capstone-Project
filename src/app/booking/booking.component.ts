import { Component } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  activebook: string | null = null;

  openbooking(book: string) {
    this.activebook = book;
  }
  
}
