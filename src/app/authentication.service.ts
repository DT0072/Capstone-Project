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
      this.router.navigate(['/admin-dashboard']);

    }, err => {
      alert(err.message); 
      this.router.navigate(['/login']); 
    })
  } 

  // Register Method
  register(email: string, password: string){
    this.fireauth.createUserWithEmailAndPassword(email, password).then(res => {
      alert('User Registered Successfully');
      this.router.navigate(['/login']);
      this.sendEmailForVerification(res.user);
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

  // Forgot Password Method
  forgotPassword(email: string){
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      alert('Password Reset Email Sent');
      this.router.navigate(['/verify-email']);
    }, err => {
      alert('Something went wrong');
      this.router.navigate(['/forgot-password']);
    })
  }

  // Send Email For Verification Method
  sendEmailForVerification(user: any){
    user.sendEmailVerification().then((res: any) => {
      this.router.navigate(['/verify-email']);
    }, (err: any) => {
      alert('Something went wrong. Not able to send verification email.');
      this.router.navigate(['/register']);
    })
  }
}
