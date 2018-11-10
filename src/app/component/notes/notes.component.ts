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
import { DataService } from '../../core/services/data/data.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  constructor( private noteService : NotesService, private data: DataService ){}
  public token=localStorage.getItem("fundooUserToken");
  public notesArray=[];
  message : boolean

  ngOnInit() {
    this.getNotes();
    this.data.currentMessage1.subscribe(message => {
      this.message = message      
    })

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
      this.notesArray=[];
      for(var i=response["data"].data.length; i>0 ; i--){
        if((response["data"].data[i-1]["isDeleted"] == false) && (response["data"].data[i-1]["isArchived"] == false)){
        this.notesArray.push(response["data"].data[i-1])
        }
      }
      
    },(error) =>{
    });
  }
  
}