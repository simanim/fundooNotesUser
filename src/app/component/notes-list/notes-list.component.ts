/******************************************************************************
 *  Execution       :   1. default node         cmd> notes-list.component.ts 
 *
 *  Purpose         : To get the notes
 * 
 *  @file           : notes-list.component.ts
 *  @author         : simani meher
 *  @version        : 1.0
 *  @since          : 19-10-2018
 *
 ******************************************************************************/
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CardDisplayComponent } from '../card-display/card-display.component';
import { NotesService } from '../../core/services/notes/notes.service';

export interface DialogData {
  noteData:object
}

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css'],
  outputs: ['anyChanges']
})
export class NotesListComponent implements OnInit {

  noteData:object;
  public token= localStorage.getItem("fundooUserToken")

  @Input() notes;
  @Input() searchItem;
  @Input() view;
  @Output() anyChanges= new EventEmitter();
  constructor( public dialog: MatDialog, private noteListService : NotesService ) { }

  ngOnInit() {
  }
 /**
  * 
  * @description on any changes
  */
  entry(event){
    if(event){
    this.anyChanges.emit({});
    }
  }
  check(list){
    
    if(list.status=="open"){
      list.status="close";
    }
    else{
      list.status="open";
    }
    var body={
      "itemName":list.itemName,
      "status":list.status
    }
    this.noteListService.updateCheckList(list.notesId,list.id,body)
    .subscribe((response) =>{
    },(error) => {
    });
  }

  /**
  * 
  * @description opening the particular note
  */
  openDialog(noteData1): void {
    const dialogRef = this.dialog.open(CardDisplayComponent, {
      width: '600px',
      data: { noteData : noteData1 }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.anyChanges.emit({});
    });
  }

  removeLabel(labelId, cardId){
    this.noteListService.removeLabelFromNotes(cardId,labelId)
    .subscribe((response) =>{
      this.anyChanges.emit({})
    },(error) => {
    }); 
  }
  removeReminder(cardId){
    var id=[];
    id.push(cardId)
    var body={
      "noteIdList":id
    }
    this.noteListService.removeReminder(body)
    .subscribe((response) =>{
      this.anyChanges.emit({})
    },(error) => {
    });
  }
}
