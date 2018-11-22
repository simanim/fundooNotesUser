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
import { Note } from '../../core/model/model';
import { NotesService } from '../../core/services/notes/notes.service';

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
  private colaborators=[];
  ngOnInit() {
    console.log(this.data.noteData);
    
    for(let i=0;i<this.data.noteData["collaborators"].length;i++){
      this.colaborators.push(this.data.noteData["collaborators"][i])
    }
    console.log("hii",this.colaborators[0].id);
    
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
    
  let body={
    "id":data.userId,
    "email":data.email,
    "firstName":data.firstName,
    "lastName":data.lastName
  }
  this.colaborators.push(body)
  console.log(body);
  
  console.log(this.colaborators);

  this.CollaboratorService.addColaborator(body,this.data.noteData['id'])
    .subscribe((response)=>{
      console.log(response);
      
    },(error)=>{
      console.log(error);
      
    });

  }

}
