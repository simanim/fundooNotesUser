/******************************************************************************
 *  Execution       :   1. default node         cmd> reset.component.ts 
 *
 *  Purpose         : To reset password
 * 
 *  @file           : reset.component.ts
 *  @author         : simani meher
 *  @version        : 1.0
 *  @since          : 19-10-2018
 *
 ******************************************************************************/
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user/user.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  
  destroy$: Subject<boolean> = new Subject<boolean>(); 
  constructor( private resetService : UserService, private snackBar : MatSnackBar, 
    private route : ActivatedRoute, private router : Router ) { }

  private model : any = {
    "password":"",
    "confpassword":""
  };
  private id = this.route.snapshot.params.id;

  ngOnInit() {
    localStorage.setItem("fundooUserToken",this.id);
  }

  /**
  * 
  * @description password reset
  */
  reset(){
   /**
    * 
    * @description checking the passwords are matching or not
    */
    if(this.model.password != this.model.confpassword){
      this.snackBar.open("failed","passwords are not matching", {
        duration: 2000,
      });
      return;
    }

    let body={ "newPassword" : this.model.password }
    this.resetService.resetPassword(this.getFormUrlEncoded(body))
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) =>{
    localStorage.removeItem("fundooUserToken");

     /**
      * 
      * @description if the reset password is success then it will directly take to login page
      */
      this.router.navigateByUrl('/login');
    },(error) => {
      localStorage.removeItem("fundooUserToken");
      this.snackBar.open("failed","failed", {
        duration: 2000,
      });
    });
  }
  getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
   }
   ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
