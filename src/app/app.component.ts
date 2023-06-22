import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Capstone';
  isAdmin: boolean | null = null;

  constructor(private primengConfig: PrimeNGConfig, private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.checkAdminLogin();
  }

  checkAdminLogin(): void {
    this.afAuth.authState.subscribe(user => {
      this.isAdmin = user && user.uid === 'kwoY1TF3tpdhtHQnEZjU5TpOFz93';
    });
  }

  logout(): void {
    this.afAuth.signOut()
      .then(() => {
        // Logout successful. Additional actions if needed.
      })
      .catch(error => {
        // Handle logout error. Display error message or take appropriate action.
        console.error('Logout error:', error);
      });
  }
}