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
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoggerService } from '../../core/services/logger/logger.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor( private noteService : NotesService ){}

  private notes:Note[]=[];
  private pinedArray=[];
  private unpinedArray=[];
  private spinnerValue=true;

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
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) =>{
      this.notes=response["data"].data;
      this.pinedArray=[];
      this.unpinedArray=[]
      for(let i=this.notes.length; i>0 ; i--){
        if((this.notes[i-1]["isDeleted"] == false) && (this.notes[i-1]["isArchived"] == false)){
          if(this.notes[i-1]["isPined"]==true){
            this.pinedArray.push(this.notes[i-1]);
          }
          else{
            this.unpinedArray.push(this.notes[i-1]);
          }
        }
      }
      this.spinnerValue=false;
      
    },(error) =>{
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}