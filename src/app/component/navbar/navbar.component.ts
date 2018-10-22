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
  // logout(){
  //   var id=localStorage.getItem("fundooUserId");
  //   console.log(id);
  //   this.navbarService.postDataReset("/user/logout", {},id
  //   )
  //   .subscribe(
  //     (response) =>{
  //       console.log(response);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }
}
