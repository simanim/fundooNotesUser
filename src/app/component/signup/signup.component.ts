import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
// import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
// import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

export class SignupComponent implements OnInit {
 
  public service;
  model : any = {}
  public card=[];
  constructor(private myFirstService : HttpService) { 
  }

  ngOnInit() {
    let obs = this.myFirstService.getData("/user/service"); 
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
    if(this.model.password != this.model.confpassword)
    return console.log("passwords are not matching");
    console.log(this.service);
    console.log(this.model);
    this.myFirstService.postData("/user/userSignUp", {
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
      console.log(response);
    });
  }

  // emailFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.email,
  // ]);

  // matcher = new MyErrorStateMatcher();

}
