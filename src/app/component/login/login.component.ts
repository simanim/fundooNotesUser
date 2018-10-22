import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

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
  constructor(private loginService : HttpService, public snackBar: MatSnackBar,private router: Router) { }

  ngOnInit() {
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
    
    this.loginService.postData("/user/login", {
     "email": this.model.email,
     "password":this.model.password
    }).subscribe((response) =>{
      console.log(response);
      localStorage.setItem("fundooUserId",response["id"]);
      /**
      * 
      * @description if the login is success then it will directly take to dashboard page
      */
      this.router.navigateByUrl('/dashboard');
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