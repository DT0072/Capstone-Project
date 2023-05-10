import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router, Routes } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private fireauth : AngularFireAuth, private router: Router) { }
  
  // Login Method
  login(email: string, password: string){
    this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true'); 
      alert('User Login Successfully');
      this.router.navigate(['/homepage']);
    }, err => {
      alert(err.message); 
      this.router.navigate(['/login']); 
    })
  } 

  // Register Method
  register(email: string, password: string){
    this.fireauth.createUserWithEmailAndPassword(email, password).then(() => {
      alert('User Registered Successfully');
      this.router.navigate(['/login']);
    }, err => {
      alert('Something Went wrong');
      this.router.navigate(['/register']);
    })
  }

  // Logout Method
  logout(){
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/login']); 
    }) 
  }
}
