import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { ForgotpassComponent } from './component/forgotpass/forgotpass.component';
import { ResetComponent } from './component/reset/reset.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { NotesComponent } from './component/notes/notes.component';
import { AuthGuard } from "./core/services/auth/auth.guard";
import { ArchiveComponent} from "./component/archive/archive.component";
import { TrashComponent } from "./component/trash/trash.component";
import { LabelComponent } from "./component/label/label.component";
import { SearchNotesComponent } from './component/search-notes/search-notes.component';
import { ReminderComponent } from './component/reminder/reminder.component'
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgotpass', component: ForgotpassComponent },
  { path: 'resetpassword/:id', component: ResetComponent },
  { path: '', component: NavbarComponent,canActivate:[AuthGuard],children:[
    { path: 'home', component: NotesComponent },
    { path: 'archive', component: ArchiveComponent },
    { path: 'trash', component: TrashComponent },
    { path: 'label/:label', component: LabelComponent },
    { path: 'search', component: SearchNotesComponent},
    { path: 'reminder', component: ReminderComponent}
  ]},
  { path: '', redirectTo:"login", pathMatch: "full"},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }