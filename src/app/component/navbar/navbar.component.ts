/******************************************************************************
 *  Execution       :   1. default node         cmd> navbar.component.ts 
 *
 *  Purpose         : To display navbar
 * 
 *  @file           : navbar.component.ts
 *  @author         : simani meher
 *  @version        : 1.0
 *  @since          : 19-10-2018
 *
 ******************************************************************************/
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { CreateLabelComponent } from '../create-label/create-label.component';
import { MatDialog } from '@angular/material';
import { DataService } from '../../services/data.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchValue : any
  message:string;

  public signoutCard:boolean=false;
  public firstName = localStorage.getItem("fundooUserFirstname");
  public lastName = localStorage.getItem("fundooUserLastname");
  public email = localStorage.getItem("fundooUserEmail");
  public token = localStorage.getItem("fundooUserToken");
  public image= localStorage.getItem("fundooUserImage")

  public labelNotesList = [];
  public img;
  public firstLetter = this.firstName[0];
  public labelList=[];
  constructor( private navbarService : HttpService, private router : Router, public dialog : MatDialog, private data: DataService ) { }
  
  ngOnInit() {
    this.router.navigateByUrl('/notes');
    this.showLabel()
    this.data.currentMessage.subscribe(message => this.message = message);
    this.img="http://34.213.106.173/" + this.image;
  }
  search(){
    this.router.navigateByUrl('/search');
  }

  newMessage() {
    this.data.changeMessage(this.searchValue)
  }


  /**
  * 
  * @description displaying the profile
  */
  account(){
    this.signoutCard=!(this.signoutCard);
  }

  /**
  * 
  * @description for refresh of page
  */
  refresh(){
    this.router.navigateByUrl('/dashboard');
  }

  /**
  * 
  * @description for logging out from account
  */
  logout(){
    var token=localStorage.getItem("fundooUserToken");
    this.navbarService.postDataMore("/user/logout", {},token)
    .subscribe((response) =>{
      localStorage.removeItem("fundooUserToken");
      localStorage.removeItem("fundooUserId");
      localStorage.removeItem("fundooUserEmail");
      localStorage.removeItem("fundooUserFirstname");
      localStorage.removeItem("fundooUserLastname");
      this.router.navigateByUrl('/login');
    },(error) => {
    });
  }

  createLabel(): void {
    const dialogRef = this.dialog.open(CreateLabelComponent, {
      width: '300px'});

    dialogRef.afterClosed().subscribe(result => { 
      this.showLabel();
    });
  }  
  showLabel(){
  this.navbarService.getDataNotes("/noteLabels/getNoteLabelList",this.token)
    .subscribe((response) =>{
      this.labelList=[];
      for(var i=0;i<response["data"].details.length;i++){
        this.labelList.push(response["data"].details[i].label);
      }
      this.labelList.sort()
    },(error) => {
    });
  }

}
