import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import {MatSnackBar} from '@angular/material';
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

  reset(){
    if(this.model.email.length==0)
    {
      this.snackBar.open("failed","please enter email", {
        duration: 2000,
      });
      return;
    }
    this.resetService.postData("/user/reset", {
      "email": this.model.email
     }).subscribe((response) =>{
       console.log("Set password link sent to you registered email, please check");
       this.snackBar.open("check your email","Set password link sent to you registered email", {
        duration: 2000,
      });
       console.log(response);
     },(error) => {
       console.log("login unsuccess");
       console.log(error);
       if(error.status==404)
       this.snackBar.open("failed","email not found", {
         duration: 2000,
       });
     });
  }
}
