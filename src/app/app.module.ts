import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { ImageCropperModule } from 'ngx-image-cropper';

import { InterceptService} from './core/services/intercept/intercept.service';
import { FirebaseService } from './core/services/firebase/firebase.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { ForgotpassComponent } from './component/forgotpass/forgotpass.component';
import { ResetComponent } from './component/reset/reset.component';
import { NavbarComponent } from './component/navbar/navbar.component';
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
import { SearchNotesComponent } from './component/search-notes/search-notes.component';
import { PinComponent } from './component/pin/pin.component';
import { ImageCropComponent } from './component/image-crop/image-crop.component';
import { ReminderComponent } from './component/reminder/reminder.component';
import { AddCollaboratorComponent } from './component/add-collaborator/add-collaborator.component';

import { SearchPipe } from './core/pipe/search.pipe';
import { SearchNotePipe } from './core/pipe/search-note.pipe';

import {  MatFormFieldModule,
          MatInputModule,
          MatButtonModule,
          MatCardModule,
          MatIconModule,
          MatMenuModule,
          MatDialogModule,
          MatChipsModule,
          MatCheckboxModule,
          MatSnackBarModule,
          MatToolbarModule,
          MatSidenavModule,
          MatDividerModule,
          MatDatepickerModule,MatSelectModule,MatNativeDateModule,MatTooltipModule
        } from '@angular/material';



@NgModule({
  declarations: [ 
                  AppComponent,
                  LoginComponent,
                  SignupComponent,
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
                  SearchNotePipe,
                  ImageCropComponent,
                  ReminderComponent,
                  AddCollaboratorComponent
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
            ImageCropperModule,
            MatDividerModule,
            MatDatepickerModule,         
            ReactiveFormsModule,MatSelectModule,MatNativeDateModule,MatTooltipModule

  ],

  providers: [MatDatepickerModule, FirebaseService, InterceptService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    }],
  
  bootstrap: [ AppComponent],

  entryComponents:[
                    NotesListComponent, 
                    CardDisplayComponent, 
                    CreateLabelComponent,
                    NavbarComponent ,
                    ImageCropComponent,AddCollaboratorComponent,CollaboratorComponent
  ]

})

export class AppModule { }
