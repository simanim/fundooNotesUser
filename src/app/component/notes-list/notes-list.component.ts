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
import { HttpService } from '../../services/http.service';

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
  @Output() anyChanges= new EventEmitter();
  
  constructor( public dialog: MatDialog, private noteListService : HttpService ) { }

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
    console.log(list);
    
    if(list.status=="open"){
      list.status="close";
    }
    else{
      list.status="open";
    }
    this.noteListService.postDataMore("/notes/"+list.notesId+"/checklist/"+list.id+"/update", {
      "itemName":list.itemName,
      "status":list.status
    },this.token)
    .subscribe((response) =>{
      console.log(response)
    },(error) => {
      console.log(error)
    });
  }

  /**
  * 
  * @description opening the particular note
  */
  openDialog(noteData1): void {
    const dialogRef = this.dialog.open(CardDisplayComponent, {
      width: '50%',
      data: { noteData : noteData1 }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.anyChanges.emit({});
    });
  }

  removeLabel(labelId, cardId){
    this.noteListService.postDataMore("/notes/"+cardId+"/addLabelToNotes/"+labelId+"/remove",{},this.token)
    .subscribe((response) =>{
      this.anyChanges.emit({})
    },(error) => {
    }); 
  }

}
