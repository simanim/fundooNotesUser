/******************************************************************************
 *  Execution       :   1. default node         cmd> signup.component.ts 
 *
 *  Purpose         : To signup to a account
 * 
 *  @file           : signup.component.ts
 *  @author         : simani meher
 *  @version        : 1.0
 *  @since          : 19-10-2018
 *
 ******************************************************************************/
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user/user.service';

import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
 
  public service="";
  model : any = {
    "firstname":"",
    "lastname":"",
    "email":"",
    "password":"",
    "confpassword":""
  }
  public card=[];
  constructor(private signupService : UserService,public snackBar: MatSnackBar, private router : Router ){ }

  ngOnInit() {
    this.getService();
  }

 /**
  * 
  * @description getting the service cards
  */
  getService(){
    this.signupService.getService()
    .subscribe((response) => {
      for(let i=0;i<response["data"].data.length;i++)
      {
        response["data"].data[i].select=false;
        this.card.push(response["data"].data[i]);
      }
    });
  }

  response(data){
    data.select=!data.select;
    if(data.select==false){
      this.service="";
    }
    else{
      this.service=data.name;
    }
    for(var j=0;j<this.card.length;j++){
      if(data.name==this.card[j].name)
      continue;
      this.card[j].select=false;
    }
  }

  signup(){
   /**
    * 
    * @description checking the details are filled or not
    */
    if(this.model.firstname.length==0 || this.model.firstname.length==0 || this.model.email.length==0 || this.model.password.length==0 || this.model.confpassword.length==0)
    {
      this.snackBar.open("failed","please fill all the details", {
        duration: 2000,
      });
      return;
    }
   /**
    * 
    * @description card selection
    */
    if(this.service.length==0){
      this.snackBar.open("card is required","select a card", {
        duration: 2000,
      });
      return;
    }
   /**
    * 
    * @description checking the passwords are matching
    */
    if(this.model.password != this.model.confpassword){
      this.snackBar.open("failed","passwords are not matching", {
        duration: 2000,
      });
      return;
    }

   /**
    * 
    * @description validation for names and email
    */
    var regexName = /^[a-z]+(([',. -][ a-z])?[a-z]*)*$/;
    var regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if(regexName.test(this.model.firstname) == false){
      this.snackBar.open("failed","invalid firstname", {
        duration: 2000,
      });
      return;
    }
    if(regexName.test(this.model.lastname) == false){
      this.snackBar.open("failed","invalid lastname", {
        duration: 2000,
      });
      return;
    }
    if(regexEmail.test(this.model.email) == false){
      this.snackBar.open("failed","invalid email", {
        duration: 2000,
      });
      return;
    }
    var body={
      "firstName" : this.model.firstname,
      "lastName" : this.model.lastname,
      "service": this.service,
      "email": this.model.email,
      "password":this.model.password
    }
    this.signupService.userSignup(body)
    .subscribe((response) =>{
     /**
      * 
      * @description if the registration is success then it will directly take to login page
      */
      this.router.navigateByUrl('/login');
    },(error) => {
      this.snackBar.open("failed","something bad happened", {
        duration: 2000,
      });
    });
  }

}