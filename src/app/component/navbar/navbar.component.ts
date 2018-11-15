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
import { Router } from '@angular/router';
import { CreateLabelComponent } from '../create-label/create-label.component';
import { ImageCropComponent } from '../image-crop/image-crop.component'
import { MatDialog } from '@angular/material';
import { DataService } from '../../core/services/data/data.service';
import { UserService } from '../../core/services/user/user.service';
import { NotesService } from '../../core/services/notes/notes.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  searchValue : any
  message:string;

  public signoutCard:boolean=false;
  public firstName = localStorage.getItem("fundooUserFirstname");
  public lastName = localStorage.getItem("fundooUserLastname");
  public email = localStorage.getItem("fundooUserEmail");
  public image= localStorage.getItem("fundooUserImage");
  public width;
  public labelNotesList = [];
  public img;
  public firstLetter = this.firstName[0];
  public labelList=[];
  public selectedFile=null;
  public gridView:boolean=true
  constructor( private NavbarServiceUser : UserService, private NavbarServiceNotes : NotesService, 
    private router : Router, public dialog : MatDialog, private data: DataService ) { }
  
  ngOnInit() {
    this.router.navigateByUrl('/notes');
    this.showLabel()
    this.data.currentMessageSearch.subscribe(message => this.message = message);
    this.data.currentMessageLabel.subscribe(message =>{ this.message = message;
      if(this.message!="default")
      this.router.navigateByUrl('/label/'+this.message);
      });
    this.img="http://34.213.106.173/" + this.image;
    this.isLargeScreen();
  }
  view(){
    this.data.changeView(this.gridView)
    this.gridView=!this.gridView;
  }
  search(){
    this.router.navigateByUrl('/search');
  }

  newMessage() {
    this.data.changeMessageSearch(this.searchValue)
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
    this.NavbarServiceUser.userLogout()
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
  this.NavbarServiceNotes.showNoteLabels()
    .subscribe((response) =>{
      this.labelList=[];
      for(var i=0;i<response["data"].details.length;i++){
        this.labelList.push(response["data"].details[i].label);
      }
      this.labelList.sort()
    },(error) => {
    });
  }
  profileImage(event):void {
    const dialogRef = this.dialog.open(ImageCropComponent, {
      width: '400px',
      data: event 
    });
    dialogRef.afterClosed().subscribe(result => {
    this.img=  "http://34.213.106.173/"+localStorage.getItem("fundooUserImage")
    });
    
  }
  isLargeScreen() {
    this.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }
  

}
