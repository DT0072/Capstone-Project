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
  isUser: boolean = false;
  isAdmin: boolean = false;

  constructor(private primengConfig: PrimeNGConfig, private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.checkAdminLogin();
  }

  checkAdminLogin(): void {
      

    this.afAuth.signInWithEmailAndPassword('dttest@gmail.com', '123456')
       if (this.afAuth.signInWithEmailAndPassword != null) {
         this.isAdmin = true;
       } else {
         this.isAdmin = false;
         console.log('Admin login failed:');
       }
  }
}