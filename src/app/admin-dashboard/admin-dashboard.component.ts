import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  isAdminLoggedIn: boolean = true;

  // Function to check if admin login is successful
  checkAdminLogin() {
    // Perform your logic to check if the admin login is successful
    // Set the value of `isAdminLoggedIn` accordingly
    // For example:
    this.isAdminLoggedIn = true;
  }
}
