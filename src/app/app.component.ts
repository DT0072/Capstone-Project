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
  isUSer: boolean = false;
  isAdmin: boolean = false;

  constructor(private primengConfig: PrimeNGConfig, private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
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
  logout(): void {
    this.afAuth.signOut();
  }
}