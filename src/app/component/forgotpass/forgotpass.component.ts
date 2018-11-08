/******************************************************************************
 *  Execution       :   1. default node         cmd> forgotpass.component.ts 
 *
 *  Purpose         : To send a request to registered email id if user has forgotten password
 * 
 *  @file           : forgotpass.component.ts
 *  @author         : simani meher
 *  @version        : 1.0
 *  @since          : 19-10-2018
 *
******************************************************************************/
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit {
  model : any = {
    "email":""
  }
  constructor(private resetService : HttpService, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }
 /**
  * 
  * @description reset of password
  */
  reset(){
    if(this.model.email.length==0)
    {
     /**
      * 
      * @description checking the email is entered or not
      */
      this.snackBar.open("failed","please enter email", {
        duration: 2000,
      });
      return;
    }
    this.resetService.postData("/user/reset", {
      "email": this.model.email
    }).subscribe(
    (response) =>{
      this.snackBar.open("check your email","Set password link sent to you registered email", {
      duration: 2000,
      });
    },
    (error) => {
      if(error.status==404){
        this.snackBar.open("failed","email not found", {
         duration: 2000,
        });
      }
    });
  }
}
