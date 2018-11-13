/******************************************************************************
 *  Execution       :   1. default node         cmd> login.component.ts 
 *
 *  Purpose         : To login to Fundoo Account  
 * 
 *  @file           : login.component.ts
 *  @author         : simani meher
 *  @version        : 1.0
 *  @since          : 19-10-2018
 *
 ******************************************************************************/
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user/user.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model : any = {
    "email":"",
    "password":""
  }
  constructor( private loginService : UserService, public snackBar : MatSnackBar, private router : Router ) { }
  public id= localStorage.getItem("fundooUserToken");
  
  ngOnInit() {
    if(this.id != null){
      this.router.navigateByUrl('/dashboard');
    }
  }
 /**
  * 
  * @description user login
  */
  login(){
    if(this.model.email.length==0 || this.model.password.length==0)
    {
     /**
      * 
      * @description checking the email and password are filled
      */
      this.snackBar.open("login failed","please enter all details", {
        duration: 2000,
      });
      return;
    }

   /**
    * 
    * @description email validation
    */
    var regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if(regexEmail.test(this.model.email) == false){
      this.snackBar.open("failed","invalid email", {
        duration: 2000,
      });
      return;
    }
    var body={
      "email": this.model.email,
      "password":this.model.password
    }
    this.loginService.userLogin(body)
    .subscribe((response) =>{
      localStorage.setItem("fundooUserToken",response["id"]);
      localStorage.setItem("fundooUserId",response["userId"]);
      localStorage.setItem("fundooUserFirstname",response["firstName"]);
      localStorage.setItem("fundooUserLastname",response["lastName"]);
      localStorage.setItem("fundooUserEmail",response["email"]);
      localStorage.setItem("fundooUserImage",response["imageUrl"]);
     /**
      * 
      * @description if the login is success then it will directly take to dashboard page
      */
      this.router.navigateByUrl('/dashboard');
    },(error) => {
      if(error.status==401){
        this.snackBar.open("login failed","wrong email or password", {
          duration: 2000,
        });
      }
    });
  }
}