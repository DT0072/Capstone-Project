import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private auth : AuthenticationService) {}

  ngOnInit(): void {}

  register(){
   
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
}
