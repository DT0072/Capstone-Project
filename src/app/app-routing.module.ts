// 'CommonModule' references and 'declarations' array are unnecessary, so are no longer part of 'AppRoutingModule'
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { EventsComponent } from './events/events.component';
import { NewsComponent } from './news/news.component';
import { ThingstodoComponent } from './thingstodo/thingstodo.component';
import { AttractionsComponent } from './attractions/attractions.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';


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
  { path: 'admin', component: AdminComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
