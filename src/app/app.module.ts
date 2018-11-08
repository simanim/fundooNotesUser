import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ForgotpassComponent } from './component/forgotpass/forgotpass.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatInputModule,MatButtonModule,MatCardModule,MatIconModule,MatMenuModule,MatDialogModule,
        MatChipsModule,MatCheckboxModule,MatDividerModule} from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ResetComponent } from './component/reset/reset.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NotesComponent } from './component/notes/notes.component';
import { RemindMeComponent } from './component/remind-me/remind-me.component';
import { NotesAddComponent } from './component/notes-add/notes-add.component';
import { ChangeColorComponent } from './component/change-color/change-color.component';
import { NotesListComponent } from './component/notes-list/notes-list.component';
import { CollaboratorComponent } from './component/collaborator/collaborator.component';
import { AddImageComponent } from './component/add-image/add-image.component';
import { MoreComponent } from './component/more/more.component';
import { NotesArchiveComponent } from './component/notes-archive/notes-archive.component';
import { ArchiveComponent } from './component/archive/archive.component';
import { TrashComponent } from './component/trash/trash.component';
import { CardDisplayComponent } from './component/card-display/card-display.component';
import { CreateLabelComponent } from './component/create-label/create-label.component';
import { LabelComponent } from './component/label/label.component';
import { SearchPipe } from './pipe/search.pipe';
import { SearchNotesComponent } from './component/search-notes/search-notes.component';
import { PinComponent } from './component/pin/pin.component';
import { SearchNotePipe } from './pipe/search-note.pipe';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ForgotpassComponent,
    ResetComponent,
    NavbarComponent,
    NotesComponent,
    RemindMeComponent,
    NotesAddComponent,
    ChangeColorComponent,
    NotesListComponent,
    CollaboratorComponent,
    AddImageComponent,
    MoreComponent,
    NotesArchiveComponent,
    ArchiveComponent,
    TrashComponent,
    CardDisplayComponent,
    CreateLabelComponent,
    LabelComponent,
    SearchPipe,
    SearchNotesComponent,
    PinComponent,
    SearchNotePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatDialogModule,
    MatChipsModule,
    MatCheckboxModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[NotesListComponent, CardDisplayComponent, 
    CreateLabelComponent,NavbarComponent ]

})

export class AppModule { }
