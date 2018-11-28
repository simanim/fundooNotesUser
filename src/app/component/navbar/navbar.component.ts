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
import { environment } from '../../../environments/environment';
import { LoggerService } from '../../core/services/logger/logger.service';

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
  private labelList=[];
  private selectedFile=null;
  private gridView:boolean=true
  private labelShow:boolean=false;
  private showSearchBar:boolean=false;
  private labelValue=''
  private labelclick='';
  
  private reminder:boolean=false;
  private archive:boolean=false;
  private trash:boolean=false;
  private home:boolean=false;
  private labelShowing:boolean=false
    
  ngOnInit() {
    this.showLabel()
    this.data.currentMessageSearch.subscribe(message => this.message = message);
    this.data.currentMessageLabel.subscribe(message =>{ this.message = message;
      if(this.message!="default"){
      this.router.navigateByUrl('/label/'+this.message);
      this.toolbarName(this.message)}
      });
    this.img=environment.Url + this.image;
    this.isLargeScreen();
    this.routeCheck()
  }
  routeCheck(){
    let temp=this.router.url.split("/").pop();
    let temp2=this.router.url.split("/")
    if(temp=='home'){
      this.homeClick();
    }
    else if(temp=='reminder'){
      this.reminderClick();
    }
    else if(temp=='archive'){
      this.archiveClick();
    }
    else if(temp=='trash'){
      this.trashClick();
    }
    else if(temp2[1]=='QuestionAnswer'){
      this.labelShowing=false;
    }
    else{
      this.labelClick(temp);
    }
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
    this.home=true;
    this.reminder=this.archive=this.trash=false;
    this.router.navigateByUrl('/home');
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
      width: '300px'
    });

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
    this.img=  environment.Url+localStorage.getItem("fundooUserImage")
    });
    
  }

  isLargeScreen() {
    this.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }

  toolbarName(name){
    this.labelShow=true
    this.labelValue=name;
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  
  homeClick(){
    this.home=true;
    this.labelShowing=false;
    this.reminder=this.archive=this.trash=this.labelShowing=false;
    this.labelShow=false;
    this.router.navigateByUrl('/home');
  }
  reminderClick(){
    this.router.navigateByUrl('/reminder');
    this.toolbarName('reminder');
    this.reminder=true;
    this.home=this.archive=this.trash=this.labelShowing=false;
  }
  archiveClick(){
    this.toolbarName('archive');
    this.archive=true;
    this.reminder=this.home=this.trash=this.labelShowing=false;
    this.router.navigateByUrl('/archive');
  }
  trashClick(){
    this.toolbarName('trash');
    this.trash=true;
    this.reminder=this.archive=this.home=this.labelShowing=false;
    this.router.navigateByUrl('/trash');
  }
  labelClick(label){
    this.labelShowing=true;
    this.labelclick=label;
    this.home=this.reminder=this.archive=this.trash=false;
    this.router.navigateByUrl('/label/'+label);
    this.toolbarName(label)
  }
}
