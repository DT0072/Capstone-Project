// 'CommonModule' references and 'declarations' array are unnecessary, so are no longer part of 'AppRoutingModule'
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { EventsComponent } from './events/events.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ThingstodoComponent } from './thingstodo/thingstodo.component';
import { FooterComponent } from './footer/footer.component';
import { NewsComponent } from './news/news.component';
import { AttractionsComponent } from './attractions/attractions.component';
import { EateriesComponent } from './eateries/eateries.component';
import { BusstopComponent } from './busstop/busstop.component';
import { AdminTopbarComponent } from './admin-topbar/admin-topbar.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminAttComponent } from './admin-att/admin-att.component';


const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' }, //Default route
  { path: 'homepage', component: HomepageComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'events', component: EventsComponent },
  { path: 'news', component: NewsComponent },
  { path: 'thingstodo', component: ThingstodoComponent },
  { path: 'attractions', component: AttractionsComponent },
  { path: 'register', component: RegisterComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'searchbar', component: SearchbarComponent },
  { path: 'events', component: EventsComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'thingstodo', component: ThingstodoComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'news', component: NewsComponent },
  { path: 'attractions', component: AttractionsComponent },
  { path: 'eateries', component: EateriesComponent },
  { path: 'busstop', component: BusstopComponent },
  { path: 'admin-topbar', component: AdminTopbarComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin-att', component: AdminAttComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
