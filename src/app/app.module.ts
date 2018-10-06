import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {MatInputModule,MatButtonModule,MatCardModule,MatIconModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    AppRoutingModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    FlexLayoutModule,MatCardModule,MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
