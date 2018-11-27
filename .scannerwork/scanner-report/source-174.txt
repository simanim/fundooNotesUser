/******************************************************************************
 *  Execution       :   1. default node         cmd> notes-archive.component.ts 
 *
 *  Purpose         : To archive the note
 * 
 *  @file           : notes-archive.component.ts
 *  @author         : simani meher
 *  @version        : 1.0
 *  @since          : 19-10-2018
 *
 ******************************************************************************/
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import { NotesService } from '../../core/services/notes/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-notes-archive',
  templateUrl: './notes-archive.component.html',
  styleUrls: ['./notes-archive.component.scss']
})
export class NotesArchiveComponent implements OnInit {
  
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() card;
  @Output() onArchiveEntry= new EventEmitter()

  constructor( private noteArchiveService : NotesService, private snackBar : MatSnackBar ) { }

  private isArchive:boolean=false;

  ngOnInit() {
    if(this.card){
    if(this.card.isArchived==true){
      this.isArchive=true;
    }}
  }

  /**
  * 
  * @description archive the particular note
  */
  archive(){
    if(this.card){
      let id=[];
      id.push(this.card.id);
      let string;
      let body={
        "isArchived":!this.card.isArchived,
        "noteIdList":id
      }
      this.noteArchiveService.archiveNote(body)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) =>{
        this.onArchiveEntry.emit({})
        if(this.card.isArchived==false)  
          string="Note Archived";
        else  
          string="Note Unarchived";
        this.snackBar.open( string ,"undo", {
          duration: 2000,
        });
      },(error) =>{
      });
    }
    else{
      this.onArchiveEntry.emit({})
    }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  
}
