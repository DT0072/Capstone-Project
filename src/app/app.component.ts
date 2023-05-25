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

  constructor(private primengConfig: PrimeNGConfig, private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    
  }
}