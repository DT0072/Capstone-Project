import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatMenuModule} from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { environment } from 'src/environments/environment.development';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { OwlModule } from 'ngx-owl-carousel';


@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    AboutUsComponent,
    SearchbarComponent,
    
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    OwlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }


