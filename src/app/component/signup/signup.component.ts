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
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoggerService } from '../../core/services/logger/logger.service';
import { DataService } from '../../core/services/data/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private signupService : UserService,private snackBar: MatSnackBar, private router : Router,
              private dataService :DataService ){ }
 
  private service="";
  public model : any = {
    "firstname":"",
    "lastname":"",
    "email":"",
    "password":"",
    "confpassword":""
  };
  private card=[];
  private cardId="";
  private cartId=localStorage.getItem("productCartId");
  ngOnInit() {
    this.getCardDetails();
    this.getService();
  }

 /**
  * 
  * @description getting details of cart
  */
  getCardDetails(){
    this.signupService.getCardDetails(this.cartId)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) => {
      this.cardId=response["data"].product.id;
    },(error)=>{
    });
  }

 /**
  * 
  * @description selecting product
  */
  goToCart(){
    this.router.navigateByUrl('/card');
  }

 /**
  * 
  * @description getting the service cards
  */
  getService(){
    this.signupService.getService()
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) => {
      for(let i=0;i<response["data"].data.length;i++){
        response["data"].data[i].select=false;
        this.card.push(response["data"].data[i]);
      }
      for(let j=0;j<this.card.length;j++){
        if(this.card[j].id==this.cardId)
          this.service=this.card[j].name;
      }
    });
  }

 /**
  * 
  * @description user signup
  */
  signup(){
   /**
    * 
    * @description checking the details are filled or not
    */
    if(this.model.firstname.length==0 || this.model.lastname.length==0 || this.model.email.length==0 || 
      this.model.password.length==0 || this.model.confpassword.length==0)
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
    let regexName = /^[a-z]+(([',. -][ a-z])?[a-z]*)*$/;
    let regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
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
    let body={
      "firstName" : this.model.firstname,
      "lastName" : this.model.lastname,
      "service": this.service,
      "email": this.model.email,
      "password":this.model.password,
      "cartId":this.cartId
    }
    this.signupService.userSignup(body)
    .pipe(takeUntil(this.destroy$))
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

 /**
  * 
  * @description already have account
  */
  signin(){
    this.router.navigateByUrl('/login');
  }

 /**
  * 
  * @description unsubscribing
  */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}