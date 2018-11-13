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

@Component({
  selector: 'app-notes-archive',
  templateUrl: './notes-archive.component.html',
  styleUrls: ['./notes-archive.component.scss']
})
export class NotesArchiveComponent implements OnInit {
  @Input() card;
  @Output() onArchiveEntry= new EventEmitter()

  public token=localStorage.getItem("fundooUserToken");
  constructor( private noteArchiveService : NotesService, public snackBar : MatSnackBar ) { }
  public isArchive:boolean=false;
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
      var id=[];
      id.push(this.card.id);
      var body={
        "isArchived":!this.card.isArchived,
        "noteIdList":id
      }
      this.noteArchiveService.archiveNote(body)
      .subscribe((response) =>{
        this.onArchiveEntry.emit({})
        if(this.card.isArchived==false) var string="Note Archived"
        else var string="Note Unarchived"
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
}
