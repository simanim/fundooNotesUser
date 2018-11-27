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
import { MatSnackBar } from '@angular/material';
import { UserService } from '../../core/services/user/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.scss']
})
export class ForgotpassComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private resetService : UserService, private snackBar: MatSnackBar) { }

  public model : any = {
    "email":""
  }

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
    let body={
      "email": this.model.email
    }
    this.resetService.forgotPassword(body)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) =>{
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
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
