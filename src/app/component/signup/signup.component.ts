import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import {MatSnackBar} from '@angular/material';

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
  }
  public card=[];
  constructor(private signupService : HttpService,public snackBar: MatSnackBar){ }

  ngOnInit() {
    let obs = this.signupService.getData("/user/service"); 
    obs.subscribe((response) => {
      // console.log(response["data"]);
      for(let i=0;i<response["data"].data.length;i++)
      {
        response["data"].data[i].select=false;
        this.card.push(response["data"].data[i]);
      }
      // console.log(this.card);
    });
  }

  response(data){
    // console.log(data.name);
    this.service=data.name;
    data.select=!data.select;
    for(var j=0;j<this.card.length;j++)
    {
      if(data.name==this.card[j].name)
      continue;
      this.card[j].select=false;
    }//console.log(this.card);
  }

  signup(){
    if(this.model.firstname.length==0 || this.model.firstname.length==0 || this.model.email.length==0 || this.model.password.length==0)
    {
      this.snackBar.open("registration failed","try again", {
        duration: 2000,
      });
      return;
    }
    if(this.service.length==0){
      this.snackBar.open("card is required","select a card", {
        duration: 2000,
      });
      return;
    }

    if(this.model.password != this.model.confpassword){
      this.snackBar.open("failed","passwords are not matching", {
        duration: 2000,
      });
      return;
    }

    this.signupService.postData("/user/userSignUp", {
    "firstName" : this.model.firstname,
    "lastName" : this.model.lastname,
    "phoneNumber": "0123456789",
    "service": this.service,
    "createdDate": "2018-10-10T06:58:34.327Z",
    "modifiedDate": "2018-10-10T06:58:34.327Z",
    "username": this.model.email,
    "email": this.model.email,
    "emailVerified": true,
    "password":this.model.password
    }).subscribe((response) =>{
      console.log("success");
      console.log(response);
      this.snackBar.open("","registration Successful", {
        duration: 2000,
      });
    },(error) => {
      console.log("registration failed");
      console.log(error);
      this.snackBar.open("failed","something bad happened", {
        duration: 2000,
      });
    });
  }

}
