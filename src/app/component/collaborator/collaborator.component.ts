/******************************************************************************
 *  Execution       :   1. default node         cmd> collaborator.component.ts 
 *
 *  Purpose         : To 
 * 
 *  @file           : collaborator.component.ts
 *  @author         : simani meher
 *  @version        : 1.0
 *  @since          : 19-10-2018
 *
******************************************************************************/
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddCollaboratorComponent, DialogData } from '../add-collaborator/add-collaborator.component';
import { environment } from '../../../environments/environment';
import { UserService } from '../../core/services/user/user.service';
import { NotesService } from '../../core/services/notes/notes.service';
import { LoggerService } from '../../core/services/logger/logger.service';
@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {

  constructor( private dialogRef : MatDialogRef<AddCollaboratorComponent>, 
  @Inject(MAT_DIALOG_DATA) private data : DialogData, private collaboratorService : UserService,
  private CollaboratorService : NotesService ) { }

  private searchValue :any;  
  private img=environment.Url + localStorage.getItem("fundooUserImage");
  private firstName=localStorage.getItem("fundooUserFirstname");
  private lastName=localStorage.getItem("fundooUserLastname");
  private email=localStorage.getItem("fundooUserEmail");
  private userList=[];
  private search:Boolean=false;
  private collaborators=[];
  ngOnInit() {
    for(let i=0;i<this.data.noteData["collaborators"].length;i++){
      this.collaborators.push(this.data.noteData["collaborators"][i])
    }
  }
  cancel(){
    this.dialogRef.close();
  }
  searchUser(){
    let body={
      'searchWord':this.searchValue
    }
    this.collaboratorService.searchUserList(body)
    .subscribe((response)=>{
      this.userList=[];
      this.userList=response['data'].details;

    },(error)=>{
      
    });
  }
  addCol(data){
    console.log(data);
    console.log(this.collaborators);
    
    for(let i=0;i<this.collaborators.length;i++){
      if(data==this.collaborators[i])
      {
        return console.log("same");
      }
    }
    this.CollaboratorService.addColaborator(data,this.data.noteData['id'])
    .subscribe((response)=>{
      this.collaborators.push(data)
    },(error)=>{
    });
  }

  removeCol(data){
    this.CollaboratorService.removeColaborator(this.data.noteData['id'],data.userId)
    .subscribe((response)=>{
      LoggerService.log("heyy",response);
    },(error)=>{
    });
  }

}
