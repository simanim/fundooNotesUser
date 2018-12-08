import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { ErrorsHandler } from './core/services/error_handler/errors-handler';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { ImageCropperModule } from 'ngx-image-cropper';

import { InterceptService} from './core/services/intercept/intercept.service';
import { FirebaseService } from './core/services/firebase/firebase.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { BarRatingModule } from "ngx-bar-rating";
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
import {RatingModule} from "ngx-rating/index";

import { SearchPipe } from './core/pipe/search.pipe';
import { SearchNotePipe } from './core/pipe/search-note.pipe';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

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
          MatDatepickerModule,
          MatSelectModule,
          MatNativeDateModule,
          MatTooltipModule,
          MatTabsModule,
          MatStepperModule,
          MatProgressBarModule
        } from '@angular/material';
import { QuestionAnswerComponent } from './component/question-answer/question-answer.component';
import { ProductCardComponent } from './component/product-card/product-card.component';
import { CardDetailsComponent } from './component/card-details/card-details.component';
import { ShoppingCartComponent } from './component/shopping-cart/shopping-cart.component';
import { LoaderComponent } from './component/loader/loader.component';



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
                  AddCollaboratorComponent,
                  QuestionAnswerComponent,
                  ProductCardComponent,
                  CardDetailsComponent,
                  ShoppingCartComponent,
                  LoaderComponent
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
            MatTabsModule,
            MatDividerModule,
            MatDatepickerModule,         
            ReactiveFormsModule,
            MatSelectModule,
            MatNativeDateModule,
            MatTooltipModule,
            RatingModule,
            BarRatingModule,
            MatStepperModule,
            FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
            MatProgressBarModule
  ],

  providers: [MatDatepickerModule, FirebaseService, InterceptService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler,
    }
  ],
  
  bootstrap: [ AppComponent],

  entryComponents:[
                    NotesListComponent, 
                    CardDisplayComponent, 
                    CreateLabelComponent,
                    NavbarComponent ,
                    ImageCropComponent,
                    AddCollaboratorComponent,
                    CollaboratorComponent,
                    ProductCardComponent,
                    CardDetailsComponent
  ]

})

export class AppModule { }
