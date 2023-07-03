import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  activebook: string = 'user';
  userData: any = {}; // Update the variable declaration

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.getUserData();
  }

  openbooking(tab: string) {
    this.activebook = tab;
  }

  getUserData() {
    this.authService.getUserData().subscribe(
      (data: any) => {
        this.userData = data;
      },
      (error: any) => {
        console.error('Error retrieving user data:', error);
      }
    );
  }
}
