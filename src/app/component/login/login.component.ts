import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model : any = {
    "email":"",
    "password":""
  }
  constructor(private loginService : HttpService, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  login(){
    if(this.model.email.length==0 || this.model.password.length==0)
    {
      this.snackBar.open("login failed","please enter email and password", {
        duration: 2000,
      });
      return;
    }
    this.loginService.postData("/user/login", {
     "email": this.model.email,
     "password":this.model.password
    }).subscribe((response) =>{
      console.log("login success");
      console.log(response);
    },(error) => {
      console.log("login unsuccess");
      console.log(error);
      if(error.status==401)
      this.snackBar.open("login failed","wrong email or password", {
        duration: 2000,
      });
    });
  }
}