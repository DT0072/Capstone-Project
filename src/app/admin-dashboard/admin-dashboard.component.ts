import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  isAdmin: boolean = false;

  constructor(private afAuth: AngularFireAuth){}

  ngOnInit(): void {
    this.checkAdminLogin();
  }

  checkAdminLogin(): void {
    this.afAuth.authState.subscribe(user => {
      if(user && user.uid === 'kwoY1TF3tpdhtHQnEZjU5TpOFz93'){
        this.isAdmin = true;
      }else {
        this.isAdmin = false;
      }
    });
  }
}
