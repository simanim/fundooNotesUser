/******************************************************************************
 *  Execution       :   1. default node         cmd> notes.component.ts 
 *
 *  Purpose         : To display the notes page
 * 
 *  @file           : notes.component.ts
 *  @author         : simani meher
 *  @version        : 1.0
 *  @since          : 19-10-2018
 *
 ******************************************************************************/
import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../core/services/notes/notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  constructor( private noteService : NotesService ){}
  public token=localStorage.getItem("fundooUserToken");
  public notesArray=[];
  pined:String="PINED";
  others:String="OTHERS";
  ngOnInit() {
    this.getNotes();
  }

  /**
  * 
  * @description refresh the page after any change in notelist
  */
  refresh(event){
    if(event){
      this.getNotes();
    }
  }

  /**
  * 
  * @description getting the note list
  */
 public pinedArray=[];
 public unpinedArray=[];
  getNotes(){
    this.noteService.getNoteList()
    .subscribe((response) =>{
      this.notesArray=[];
      this.pinedArray=[];
      this.unpinedArray=[]
      for(var i=response["data"].data.length; i>0 ; i--){
        if((response["data"].data[i-1]["isDeleted"] == false) && (response["data"].data[i-1]["isArchived"] == false)){
        this.notesArray.push(response["data"].data[i-1]);
        }
      }
      for(var j=0;j<this.notesArray.length;j++){
        if(this.notesArray[j]["isPined"]==true){
          this.pinedArray.push(this.notesArray[j]);}
        else{
          this.unpinedArray.push(this.notesArray[j]);}
      }
    },(error) =>{
    });
  }
}