import { Component } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { DataService } from '../shared/data.service';
import { UserData } from '../model/user-data';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  // constructor(private auth : AuthenticationService) {}

  // ngOnInit(): void {}

  // register(){
   
  //   if(this.email == ''){
  //     alert('Please enter your email');
  //     return
  //   }

  //   if(this.password == ''){
  //     alert('Please enter your password');
  //     return
  //   }
    
  //   this.auth.register(this.email, this.password);
    
  //   this.email = '';
  //   this.password = '';
  // }

  userdataList: UserData[] = [];
  userdataObj: UserData= {
    user_id: '',
    user_firstname: '',
    user_lastname: '',
    user_email: '',
    user_password: ''
  };
  user_id: string= '';
  user_firstname: string= '';
  user_lastname: string= '';
  user_email: string= '';
  user_password: string= '';

  constructor(private auth: AuthenticationService, private data: DataService, private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  register() {
    if(this.email == ''){
      alert('Please enter your email');
      return
    }

    if(this.password == ''){
      alert('Please enter your password');
      return
    }
    
    this.auth.register(this.email, this.password);
    
    this.email = '';
    this.password = '';
  }

  // Get All Attractions
  getAllUsers() {
    this.data.getAllAttractions().subscribe(res => {
      this.userdataList= res.map( (e: any) => {
        const data= e.payload.doc.data();
        data.att_id= e.payload.doc.id;
        return data;
      })
    }, err => {
      alert('Error while fetching users, please try again later');
    })
  }

  // Reset Form
  resetForm() {
    this.user_id= '';
    this.user_firstname= '';
    this.user_lastname= '';
    this.user_email= '';
    this.user_password= '';
  }

  // Add Users
  addUsers() {
    if(this.user_firstname == '' || this.user_lastname == '' || this.user_email == '' || this.user_password == '') {
      alert('Please fill in all fields');
      return;
    }

    this.userdataObj.user_id= '';
    this.userdataObj.user_firstname= this.user_firstname;
    this.userdataObj.user_lastname= this.user_lastname;
    this.userdataObj.user_email= this.user_email;
    this.userdataObj.user_password= this.user_password;

    this.data.addUsers(this.userdataObj);
    this.resetForm();
  }

  // Delete Users
  deleteUsers(userdata: UserData) {
    if(window.confirm('Are you sure you want to delete ' + userdata.user_firstname + '?')){
      this.data.deleteUsers(userdata);
    }
  }
}
