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
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
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
  private CollaboratorService : NotesService, private snackBar : MatSnackBar ) { }

  private searchValue :any;  
  private userList=[];
  private search:Boolean=false;
  private collaborators=[];
  private owner=this.data.noteData["user"];
  private img=environment.Url+this.owner.imageUrl;
  ngOnInit() {
    if(this.data.noteData){

    for(let i=0;i<this.data.noteData["collaborators"].length;i++){
      this.collaborators.push(this.data.noteData["collaborators"][i])
    }
  }
  }
  save(){
    this.dialogRef.close();
  }
  searchUser(){
    let body={ 'searchWord':this.searchValue };
    this.collaboratorService.searchUserList(body)
    .subscribe((response)=>{
      this.userList=[];
      this.userList=response['data'].details;
    },(error)=>{  
    });
  }
  addCol(data){
    if(this.data.noteData){
      for(let i=0;i<this.collaborators.length;i++){
        if(data.email==this.collaborators[i].email)
        {
          this.snackBar.open("failed","this email already exist", {
            duration: 2000,
          });
          return;
        }
      }
      this.CollaboratorService.addColaborator(data,this.data.noteData['id'])
      .subscribe((response)=>{
        this.collaborators.push(data);
      },(error)=>{
      });
    }
    else{
      this.collaborators.push(data);
    }
  }

  removeCol(data){
    if(this.data.noteData){
      this.CollaboratorService.removeColaborator(this.data.noteData['id'],data.userId)
      .subscribe((response)=>{
        for(let j=0;j<this.collaborators.length;j++){
          if(data==this.collaborators[j]){
            this.collaborators.splice(j, 1);
          }
        }
      },(error)=>{
      });
    }
    else{
      for(let j=0;j<this.collaborators.length;j++){
        if(data==this.collaborators[j]){
          this.collaborators.splice(j, 1);
        }
      }
    }
  }

}
