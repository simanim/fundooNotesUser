import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ForgotpassComponent } from './component/forgotpass/forgotpass.component';
import { ResetComponent } from './component/reset/reset.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { NotesComponent } from './component/notes/notes.component';
import { RemindMeComponent } from './component/remind-me/remind-me.component';
import { NotesAddComponent } from './component/notes-add/notes-add.component';
import {  AuthGuard} from "./component/auth/auth.guard";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent,  canActivate:[AuthGuard] },
  { path: 'forgotpass', component: ForgotpassComponent },
  { path: 'resetpassword/:id', component: ResetComponent },
  { path: 'navbar', component: NavbarComponent ,children:[
    { path: 'notes', component: NotesComponent ,children:[
      { path: 'remind', component: RemindMeComponent },
      { path: 'noteadd', component: NotesAddComponent }
    ]},
  ]},
  { path: '', redirectTo:"login", pathMatch: "full"}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }