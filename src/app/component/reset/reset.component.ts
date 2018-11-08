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
import { HttpService } from '../../services/http.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  model : any = {
    "password":"",
    "confpassword":""
  };

  constructor( private resetService : HttpService, public snackBar : MatSnackBar, public route : ActivatedRoute, private router : Router ) { }


  public id = this.route.snapshot.params.id;
  ngOnInit() {
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

    var body={ "newPassword" : this.model.password }
    this.resetService.postDataReset("/user/reset-password", body, this.id)
    .subscribe((response) =>{
     /**
      * 
      * @description if the reset password is success then it will directly take to login page
      */
      this.router.navigateByUrl('/login');
    },(error) => {
      this.snackBar.open("failed","failed", {
        duration: 2000,
      });
    });
  }

}
