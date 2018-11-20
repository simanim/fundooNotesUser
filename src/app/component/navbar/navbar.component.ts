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
import { Label } from '../../core/model/model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor( private NavbarServiceUser : UserService, private NavbarServiceNotes : NotesService, 
    private router : Router, private dialog : MatDialog, private data: DataService ) { }

  private label:Label[] = [];
  private searchValue : any
  private message:string;
  private signoutCard:boolean=false;
  private firstName = localStorage.getItem("fundooUserFirstname");
  private lastName = localStorage.getItem("fundooUserLastname");
  private email = localStorage.getItem("fundooUserEmail");
  private image= localStorage.getItem("fundooUserImage");
  private width;
  private labelNotesList = [];
  private img;
  // private firstLetter = this.firstName[0];
  private labelList=[];
  private selectedFile=null;
  private gridView:boolean=true
  private  labelShow:boolean=false;
  private showSearchBar:boolean=false;
  private labelValue=''
  
  
    
  ngOnInit() {
    this.showLabel()
    this.data.currentMessageSearch.subscribe(message => this.message = message);
    this.data.currentMessageLabel.subscribe(message =>{ this.message = message;
      if(this.message!="default"){
      this.router.navigateByUrl('/label/'+this.message);
      this.toolbarName(this.message)}
      });
    this.img="http://34.213.106.173/" + this.image;
    this.isLargeScreen();
  }

  hideSearch(){
    this.showSearchBar=false;
    this.data.changeMessageSearch('');
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
    this.router.navigateByUrl('/home');
    this.labelShow=false;
  }

  /**
  * 
  * @description for logging out from account
  */
  logout(){
    this.NavbarServiceUser.userLogout()
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) =>{
      localStorage.removeItem("fundooUserToken");
      localStorage.removeItem("fundooUserId");
      localStorage.removeItem("fundooUserEmail");
      localStorage.removeItem("fundooUserFirstname");
      localStorage.removeItem("fundooUserLastname");
      localStorage.removeItem("fundooUserImage");
      this.router.navigateByUrl('/login');
    },(error) => {
    });
  }

  createLabel(): void {
    const dialogRef = this.dialog.open(CreateLabelComponent, {
      width: '300px'});

    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => { 
      this.showLabel();
    });
  }  

  showLabel(){
  this.NavbarServiceNotes.showNoteLabels()
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) =>{
      this.label=response["data"].details;
      this.labelList=[];
      for(let i=0;i<this.label.length;i++){
        this.labelList.push(this.label[i].label);
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
    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
    this.img=  "http://34.213.106.173/"+localStorage.getItem("fundooUserImage")
    });
    
  }

  isLargeScreen() {
    this.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }

  toolbarName(aa){
    this.labelShow=true
    this.labelValue=aa
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
