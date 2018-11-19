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
import { Note } from '../../core/model/model';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  constructor( private noteService : NotesService ){}
  notes:Note[]=[];
  private pinedArray=[];
  private unpinedArray=[];
  private notesArray=[];
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
 
  getNotes(){
    this.noteService.getNoteList()
    .subscribe((response) =>{
      this.notes=response["data"].data;
      this.notesArray=[];
      this.pinedArray=[];
      this.unpinedArray=[]
      for(var i=this.notes.length; i>0 ; i--){
        if((this.notes[i-1]["isDeleted"] == false) && (this.notes[i-1]["isArchived"] == false)){
        this.notesArray.push(this.notes[i-1]);
        }
      }
      for(var j=0;j<this.notesArray.length;j++){
        if(this.notesArray[j]["isPined"]==true){
          this.pinedArray.push(this.notesArray[j]);}
        else{
          this.unpinedArray.push(this.notesArray[j]);}
      }
      console.log(this.unpinedArray);
      
    },(error) =>{
    });
  }
}