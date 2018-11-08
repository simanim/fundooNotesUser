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
import { HttpService } from '../../services/http.service';

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
  public token=localStorage.getItem("fundooUserToken");
  constructor( private updateService : HttpService, public dialogRef : MatDialogRef<NotesListComponent>, @Inject(MAT_DIALOG_DATA) public data : DialogData ) {}
  public labels=[];
  public isDelete=false;
  public cardColor;
  ngOnInit() {
    this.labels=this.data.noteData["noteLabels"];
    this.isDelete=this.data.noteData["isDeleted"];
    this.cardColor=this.data.noteData["color"];
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
      this.updateService.postDataMore("/notes/updateNotes", {
        "noteId":this.data.noteData["id"],
        "title" : titleValue,
        "description" : descriptionValue
      },this.token)
      .subscribe((response) =>{
      },(error) => {
      });
    }
    this.dialogRef.close();
  }

  removeLabel(labelId, cardId){
    this.updateService.postDataMore("/notes/"+cardId+"/addLabelToNotes/"+labelId+"/remove",{},this.token)
    .subscribe((response) =>{
      for(var i=0;i<this.labels.length;i++){
        if(this.labels[i]['id']==labelId)
        this.labels.splice(i, 1);
      }
    },(error) => {
    }); 
  }

  changes(event){
    if(event)
    this.cardColor=event;
  }
  popup(event){
    this.labels=[];
    for(var i=0;i<event.length;i++){
      this.labels.push(event[i])
    }
  }
  archive(event){
    if(event)
    this.dialogRef.close();
  }

  check(list){
    if(list.status=="open"){
      list.status="close";
    }
    else{
      list.status="open";
    }
    this.updateService.postDataMore("/notes/"+list.notesId+"/checklist/"+list.id+"/update", {
      "itemName":list.itemName,
      "status":list.status
    },this.token)
    .subscribe((response) =>{
    },(error) => {
    });
  }
  listitem(list){
    this.updateService.postDataMore("/notes/"+list.notesId+"/checklist/"+list.id+"/update", {
      "itemName":list.itemName,
      "status":list.status
    },this.token)
    .subscribe((response) =>{
    },(error) => {
    });
  }
  removeCheckList(list){
    this.updateService.postDataMore("/notes/"+list.notesId+"/checklist/"+list.id+"/remove", {},this.token)
    .subscribe((response) =>{
    },(error) => {
    });
  }
  clear(){
    this.model.item="";
  }
  listAdd(){
    this.updateService.postDataMore("/notes/"+this.data.noteData["id"]+"/checklist/add", {
      "itemName":this.model.item,
      "status":"open"
    },this.token)
    .subscribe((response) =>{
    this.model.item="";
    },(error) => {
    });
  }
}