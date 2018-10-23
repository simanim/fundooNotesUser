import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public signoutCard:boolean=false;
  constructor(private navbarService : HttpService,public route:ActivatedRoute,private router: Router ) { }

  ngOnInit() {
  }
  account(){
    this.signoutCard=!(this.signoutCard);
  }
  refresh(){
    console.log("refresh")
    this.router.navigateByUrl('/dashboard');
  }
  logout(){
    var token=localStorage.getItem("fundooUserToken");
    console.log(token);
    console.log("logout")
    this.navbarService.postDataReset("/user/logout", {},token
    )
    .subscribe(
      (response) =>{
        console.log("in ")
        localStorage.removeItem("fundooUserToken");
        localStorage.removeItem("fundooUserId");
        this.router.navigateByUrl('/login');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
