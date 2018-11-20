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
import { NotesService } from '../../core/services/notes/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-notes-add',
  templateUrl: './notes-add.component.html',
  styleUrls: ['./notes-add.component.scss'],
  outputs: ['onNewEntry']
})
export class NotesAddComponent implements OnInit {
  
  destroy$: Subject<boolean> = new Subject<boolean>();
  @ViewChild('title') title: ElementRef;
  @ViewChild('description') description: ElementRef ;
  @ViewChild('listItem') listItem: ElementRef ;
  @Output() onNewEntry= new EventEmitter()

  constructor( private NoteAddService : NotesService ){}

  private noteCard:boolean=true;
  private isPin:boolean=false;
  private cardColor="#FFFFFF";
  private isAchive:boolean=false;
  private labels=[];
  private reminder=[];
  private listNote:boolean=false;
  private listArray=[];
  private current =new Date();
  private date;
  private model : any={
    "item":""
  }

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
    if(this.model.item=='') return false;
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
    for(let i=0;i<this.listArray.length;i++){
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
    for(let i=0;i<this.listArray.length;i++){
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
    let title1=this.title.nativeElement.innerHTML;
    if(title1 == ""){
      this.listArray=[];
      this.listNote=false;
      return false;
    }
    let labelId=[]
    for(let i=0;i<this.labels.length;i++){
      labelId.push(this.labels[i].id)
    }
    if(this.listNote==false){

    let description1=this.description.nativeElement.innerHTML;
    let body={
      "title" : title1,
      "description" : description1,
      "isPined"	: this.isPin,
      "color":this.cardColor,
      "isArchived":this.isAchive,
      "labelIdList":	JSON.stringify(labelId),
      "reminder":this.reminder
    }
    this.NoteAddService.addNote(this.getFormUrlEncoded(body))
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) =>{
      this.onNewEntry.emit({})
    },(error) => {
    });}
    else{
      let checkList1=this.listArray;
      let bodyList={
        "title" : title1,
        "checklist" : JSON.stringify(checkList1),
        "isPined"	: this.isPin,
        "color":this.cardColor,
        "isArchived":this.isAchive,
        "labelIdList":	JSON.stringify(labelId),
        "reminder":this.reminder
      }
      this.NoteAddService.addNote(this.getFormUrlEncoded(bodyList))
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) =>{
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
    this.reminder=[];
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
  * @description adding or removing of reminder
  */
  addRemoveReminder(value){
    this.reminder=[];
    this.reminder.push(value)
    this.date=new Date(value).getUTCHours()
    let saved=new Date(value).getTime();
    let current=this.current.getTime();
    let year=new Date(value).getFullYear();
    let month=new Date(value).getMonth();
    let date=new Date(value).getDate();
    let hr;
    let min;
    let ampm='AM';
    if(saved<current){
      if((year==this.current.getFullYear())&&(month==this.current.getMonth())&&(date+1==this.current.getDate())){
        hr=new Date(value).getHours();
        if(new Date(value).getHours()>12){
          ampm='PM';
          hr=new Date(value).getHours()-12;
        }
        if(hr<10){
          hr='0'+hr;
        }
        if(new Date(value).getMinutes()<10){
          min='0'+new Date(value).getMinutes();
        }
        this.date="yesterday "+hr+":"+min+" "+ampm;
      }
      else{
        this.date=value
        return 4;
      }
      return 1;
    }
    else {
      if((year==this.current.getFullYear())&&(month==this.current.getMonth()) &&(date==this.current.getDate())){
        hr=new Date(value).getHours();
        if(new Date(value).getHours()>12){
          ampm='PM';
          hr=new Date(value).getHours()-12;
        }
        if(hr<10){
          hr='0'+hr;
        }
        if(new Date(value).getMinutes()<10){
          min='0'+new Date(value).getMinutes();
        }
        this.date="today "+hr+":"+min+" "+ampm;
      }
      else if((year==this.current.getFullYear())&&(month==this.current.getMonth())&&(date==this.current.getDate()+1)){
        hr=new Date(value).getHours();
        if(new Date(value).getHours()>12){
          ampm='PM';
          hr=new Date(value).getHours()-12;
        }
        if(hr<10){
          hr='0'+hr;
        }
        if(new Date(value).getMinutes()<10){
          min='0'+new Date(value).getMinutes();
        }
        this.date="tomorrow "+hr+":"+min+" "+ampm;
      }
      else {
        this.date=value;
        return 3;
      }
      return 2;
    }
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
  cancelReminder(){
    this.reminder=[];
  }
  cancelLabel(data){
    for(let i=0;i<this.labels.length;i++){
      if(this.labels[i]==data){
        this.labels.splice(i, 1);
      }
    }
  }
  checkDate(value){
    this.date=new Date(value).getUTCHours()
    let saved=new Date(value).getTime();
    let current=this.current.getTime();
    let year=new Date(value).getFullYear();
    let month=new Date(value).getMonth();
    let date=new Date(value).getDate();
    let hr;
    let min;
    let ampm='AM';
    if(saved<current){
     return false
    }
    else {
      if((year==this.current.getFullYear())&&(month==this.current.getMonth()) &&(date==this.current.getDate())){
        hr=new Date(value).getHours();
        min=new Date(value).getMinutes();
        if(new Date(value).getHours()>12){
          ampm='PM';
          hr=new Date(value).getHours()-12;
        }
        if(hr<10){
          hr='0'+hr;
        }
        if(new Date(value).getMinutes()<10){
          min='0'+new Date(value).getMinutes();
        }
        this.date="today "+hr+":"+min+" "+ampm;
      }
      else if((year==this.current.getFullYear())&&(month==this.current.getMonth())&&(date==this.current.getDate()+1)){
        hr=new Date(value).getHours();
        min=new Date(value).getMinutes();
        if(new Date(value).getHours()>12){
          ampm='PM';
          hr=new Date(value).getHours()-12;
        }
        if(hr<10){
          hr='0'+hr;
        }
        if(new Date(value).getMinutes()<10){
          min='0'+new Date(value).getMinutes();
        }
        this.date="tomorrow "+hr+":"+min+" "+ampm;
      }
      else {
        this.date=value;
        return 3;
      }
      return 2;
    }
  }

  getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
