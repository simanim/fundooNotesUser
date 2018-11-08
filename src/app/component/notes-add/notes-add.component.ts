/******************************************************************************
 *  Execution       :   1. default node         cmd> notes-add.component.ts 
 *
 *  Purpose         : To adding a new note to list
 * 
 *  @file           : notes-add.component.ts
 *  @author         : simani meher
 *  @version        : 1.0
 *  @since          : 19-10-2018
 *
 ******************************************************************************/
import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-notes-add',
  templateUrl: './notes-add.component.html',
  styleUrls: ['./notes-add.component.css'],
  outputs: ['onNewEntry']
})
export class NotesAddComponent implements OnInit {
  @ViewChild('title') title: ElementRef;
  @ViewChild('description') description: ElementRef ;
  @ViewChild('listItem') listItem: ElementRef ;

  @Output() onNewEntry= new EventEmitter()

  public token=localStorage.getItem("fundooUserToken");
  public id=localStorage.getItem("fundooUserId");

  public noteCard:boolean=true;
  public isPin:boolean=false;
  public cardColor="#FFFFFF";
  public isAchive:boolean=false;
  public labels=[];
  public listNote:boolean=false;
  public listArray=[];
  model : any={
    "item":""
  }
  constructor( private noteAddService : HttpService ){}
  ngOnInit() {
  }

  list(){
    this.listNote=true;
  }
 /**
  * 
  * @description adding a checklist
  */
  listitem(){
    this.listArray.push({"itemName":this.model.item,"status":"open"});
    this.model.item="";
  }
 /**
  * 
  * @description erase the text
  */
  clear(){
    this.model.item="";
  }
  checked(value){
    for(var i=0;i<this.listArray.length;i++){
      if(value==this.listArray[i]){
        if(value.status=="open"){
          value.status="close"
        }
        else{
          value.status="open"
        }
      }
    }
  }

 /**
  * 
  * @description remove a checklist while adding
  */
  removeList(value){
    for(var i=0;i<this.listArray.length;i++){
      if(value==this.listArray[i]){
        this.listArray.splice(i, 1);
      }
    }
  }

 /**
  * 
  * @description adding a new note
  */
 close(){
    this.noteCard=!(this.noteCard);
    var title1=this.title.nativeElement.innerHTML;
    if(title1 == ""){
      this.listArray=[];
    this.listNote=false;

      return false;
    }
    var labelId=[]
    for(var i=0;i<this.labels.length;i++){
      labelId.push(this.labels[i].id)
    }
    if(this.listNote==false){

    var description1=this.description.nativeElement.innerHTML;

    this.noteAddService.postDataReset("/notes/addNotes", {
      "title" : title1,
      "description" : description1,
      "isPined"	: this.isPin,
      "color":this.cardColor,
      "isArchived":this.isAchive,
      "labelIdList":	JSON.stringify(labelId)
    },this.token).subscribe((response) =>{
      this.onNewEntry.emit({})
    },(error) => {
    });}
    else{
      var checkList1=this.listArray;
      this.noteAddService.postDataReset("/notes/addNotes", {
        "title" : title1,
        "checklist" : JSON.stringify(checkList1),
        "isPined"	: this.isPin,
        "color":this.cardColor,
        "isArchived":this.isAchive,
        "labelIdList":	JSON.stringify(labelId)
      },this.token).subscribe((response) =>{
        this.onNewEntry.emit({})
      },(error) => {
      });
      this.listArray=[];
    this.listNote=false;

    }
  }

 /**
  * 
  * @description opening the notecard for adding
  */
  noteCardOpen(){
    this.noteCard=!(this.noteCard);
    this.isPin=false;
    this.cardColor="#FFFFFF";
    this.labels=[];
  }

 /**
  * 
  * @description giving color to new note
  */
  onColorChange(event){
    this.cardColor=event.color;
  }

 /**
  * 
  * @description archive the new note
  */
  onArchive(event){
    if(event){
      this.isAchive=true;
      this.close();
    }
  }
 /**
  * 
  * @description adding or removing of label
  */
  addRemoveLabel(event){
    this.labels=[];
    this.labels=event;
  }
 /**
  * 
  * @description pin change on note
  */
  onPinChange(event){
    this.isPin=event;
  }
  showCheckBox(event){
    this.list();
  }
}
