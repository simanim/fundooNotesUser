/******************************************************************************
 *  Execution       :   1. default node         cmd> card-display.component.ts 
 *
 *  Purpose         : To display and update card details while click on the particular card
 * 
 *  @file           : card-display.component.ts
 *  @author         : simani meher
 *  @version        : 1.0
 *  @since          : 19-10-2018
 *
******************************************************************************/
import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotesListComponent, DialogData } from '../notes-list/notes-list.component';
import { NotesService } from '../../core/services/notes/notes.service'

@Component({
  selector: 'app-card-display',
  templateUrl: './card-display.component.html',
  styleUrls: ['./card-display.component.css']
})
export class CardDisplayComponent implements OnInit {
  @ViewChild('title') title: ElementRef;
  @ViewChild('description') description: ElementRef ;
  model : any={
    "item":""
  }
  constructor( private UpdateService : NotesService, public dialogRef : MatDialogRef<NotesListComponent>, @Inject(MAT_DIALOG_DATA) public data : DialogData ) {}
  public labels=[];
  public checkList=[];
  public isDelete=false;
  public cardColor;
  ngOnInit() {
    this.labels=this.data.noteData["noteLabels"];
    this.isDelete=this.data.noteData["isDeleted"];
    this.cardColor=this.data.noteData["color"];
    this.checkList=this.data.noteData["noteCheckLists"];
  }

  /**
  *
  * @description displaying the particular note and updating the note
  */
  click(): void {
    var titleValue=this.title.nativeElement.innerHTML;
    if(titleValue == "")
    {
      return;
    }    
    if(this.data.noteData["noteCheckLists"].length==0){
      var descriptionValue=this.description.nativeElement.innerHTML;
      var body={
        "noteId":this.data.noteData["id"],
        "title" : titleValue,
        "description" : descriptionValue
      }
      this.UpdateService.updateNotes(body)
      .subscribe((response) =>{
      },(error) => {
      });
    }
    this.dialogRef.close();
  }

 /**
  *
  * @description remove a lebel from the note while displaying the card
  */
  removeLabel(labelId, cardId){
    this.UpdateService.removeLabelFromNotes(cardId,labelId)
    .subscribe((response) =>{
      for(var i=0;i<this.labels.length;i++){
        if(this.labels[i]['id']==labelId)
        this.labels.splice(i, 1);
      }
    },(error) => {
    }); 
  }

 /**
  *
  * @description on color change
  */
  colorChanges(event){
    if(event)
    this.cardColor=event;
  }

 /**
  *
  * @description on adding or removing of label
  */
  labelChanges(event){
    this.labels=[];
    for(var i=0;i<event.length;i++){
      this.labels.push(event[i])
    }
  }

 /**
  *
  * @description on note archive
  */
  archive(event){
    if(event)
    this.dialogRef.close();
  }

 /**
  *
  * @description checked or unchecked the note when display the card
  */
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
    this.UpdateService.updateCheckList(list.notesId, list.id, body)
    .subscribe((response) =>{
    },(error) => {
    });
  }

 /**
  *
  * @description update the list item 
  */
  listitem(list){
    if(list.itemName=='')return false;
    var body= {
      "itemName":list.itemName,
      "status":list.status
    }
    this.UpdateService.updateCheckList(list.notesId, list.id, body)
    .subscribe((response) =>{
    },(error) => {
    });
  }

 /**
  *
  * @description remove a checklist
  */
  removeCheckList(list){
    this.UpdateService.removeChecklist(list.notesId,list.id)
    .subscribe((response) =>{
      for(var i=0;i<this.checkList.length;i++){
        if(this.checkList[i]==list)
        this.checkList.splice(i, 1);
      }
    },(error) => {
    });
  }

  clear(){
    this.model.item="";
  }

 /**
  *
  * @description adding a checklist
  */
  listAdd(){
    if(this.model.item=='')return false;
    var body={
      "itemName":this.model.item,
      "status":"open"
    }
    this.UpdateService.addCheckList( this.data.noteData["id"], body )
    .subscribe((response) =>{
      this.checkList.push(response["data"].details)
      this.model.item="";
    },(error) => {
    });
  }
}