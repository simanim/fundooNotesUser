import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import {MatSnackBar} from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';

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

  constructor(private resetService : HttpService, public snackBar: MatSnackBar,
    public route:ActivatedRoute,private router: Router ) { }

  ngOnInit() {
  }
  public id = this.route.snapshot.params.id
  reset(){
    console.log("inn");
    if(this.model.password != this.model.confpassword)
    {
      this.snackBar.open("failed","passwords are not matching", {
        duration: 2000,
      });
      return;
    }
    var body={ "newPassword": this.model.password}
    this.resetService.postDataReset("/user/reset-password", body,this.id)
    .subscribe((response) =>{
       console.log("password successfully changed");
       this.router.navigateByUrl('/login');
     },(error) => {
       console.log("unsuccess");
       console.log(error);
      
       this.snackBar.open("failed","failed", {
         duration: 2000,
       });
     });
  }

}
