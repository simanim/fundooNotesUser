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
import { HttpService } from '../../services/http.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-notes-archive',
  templateUrl: './notes-archive.component.html',
  styleUrls: ['./notes-archive.component.css']
})
export class NotesArchiveComponent implements OnInit {
  @Input() card;
  @Output() onArchiveEntry= new EventEmitter()

  public token=localStorage.getItem("fundooUserToken");
  constructor( private noteArchiveService : HttpService, public snackBar : MatSnackBar ) { }
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
      this.noteArchiveService.postDataMore("/notes/archiveNotes", 
      {
        "isArchived":!this.card.isArchived,
        "noteIdList":id
      },this.token)
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
