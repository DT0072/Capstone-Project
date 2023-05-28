import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule} from '@angular/material/icon';
import { MatMenuModule} from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { environment } from 'src/environments/environment.development';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FooterComponent } from './footer/footer.component';
import { EventsComponent } from './events/events.component';
import { NewsComponent } from './news/news.component';
import { ThingstodoComponent } from './thingstodo/thingstodo.component';
import { AttractionsComponent } from './attractions/attractions.component';
import { EateriesComponent } from './eateries/eateries.component';
import { BusstopComponent } from './busstop/busstop.component';
import { AdminTopbarComponent } from './admin-topbar/admin-topbar.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminAttComponent } from './admin-att/admin-att.component';


@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    AdminDashboardComponent,
    SearchbarComponent,
    AboutusComponent,
    FooterComponent,
    EventsComponent,
    NewsComponent,
    ThingstodoComponent,
    AttractionsComponent,
    EateriesComponent,
    BusstopComponent,
    AdminTopbarComponent,
    AdminLoginComponent,
    AdminAttComponent,
  ],
  imports: [
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
