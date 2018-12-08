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
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../core/services/user/user.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoggerService } from '../../core/services/logger/logger.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor( private loginService : UserService, private snackBar : MatSnackBar, private router : Router ) { }

  public model : any = {
    "email":"",
    "password":""
  }
  private card=[];

  private cartId=localStorage.getItem("productCartId");
  private cardId;
  private productCartId='';
  ngOnInit() {
    
    
    if(this.cartId){
      this.productCartId=this.cartId;
    this.loginService.getCardDetails(this.cartId)
    .subscribe((response) => {
      LoggerService.log("response",response);
      this.cardId=response["data"].product.id
    },(error)=>{
    });}
    this.getService();
  }
  getService(){
    this.loginService.getService()
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) => {
      for(let i=0;i<response["data"].data.length;i++){
        response["data"].data[i].select=false;
        this.card.push(response["data"].data[i]);
      }
     
    });
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
    let regexEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if(regexEmail.test(this.model.email) == false){
      this.snackBar.open("failed","invalid email", {
        duration: 2000,
      });
      return;
    }
    let body={
      "email": this.model.email,
      "password":this.model.password,
      "cartId":this.productCartId
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
      let obj={
        "pushToken":localStorage.getItem("fundooUserPushToken")
      }
      this.loginService.pushLogin(obj)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response)=>{
      },(error)=>{
      })

      this.router.navigateByUrl('/home');
    },(error) => {
      if(error.status==401){
        this.snackBar.open("login failed","wrong email or password", {
          duration: 2000,
        });
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  forgotPass(){
    this.router.navigateByUrl('/forgotpass');
  }
  signup(){
    this.router.navigateByUrl('/card');
  }
}