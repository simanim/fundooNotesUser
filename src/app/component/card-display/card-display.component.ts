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
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoggerService } from '../../core/services/logger/logger.service';

@Component({
  selector: 'app-card-display',
  templateUrl: './card-display.component.html',
  styleUrls: ['./card-display.component.scss']
})
export class CardDisplayComponent implements OnInit {
  
  destroy$: Subject<boolean> = new Subject<boolean>();                               
  @ViewChild('title') title : ElementRef;
  @ViewChild('description') description : ElementRef ;
  
  constructor( private UpdateService : NotesService, private dialogRef : MatDialogRef<NotesListComponent>, 
  @Inject(MAT_DIALOG_DATA) private data : DialogData ) {}

  private model : any={
    "item":""
  }
  private labels=this.data.noteData["noteLabels"];
  private checkList=this.data.noteData["noteCheckLists"];
  private reminders=this.data.noteData["reminder"];
  private isDelete=this.data.noteData["isDeleted"];
  private cardColor=this.data.noteData["color"];
  private date;
  private current=new Date();

  ngOnInit() {
  }

  /**
  *
  * @description displaying the particular note and updating the note
  */
  click(): void {
    let titleValue=this.title.nativeElement.innerHTML;
    if(titleValue == "")
      return; 
    if(this.data.noteData["noteCheckLists"].length==0){
      let descriptionValue=this.description.nativeElement.innerHTML;
      let body1={
        "noteId":this.data.noteData["id"],
        "title" : titleValue,
        "description" : descriptionValue
      }
      this.UpdateService.updateNotes(body1)
      .pipe(takeUntil(this.destroy$))
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
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) =>{
      for(let i=0;i<this.labels.length;i++){
        if(this.labels[i]['id']==labelId)
        this.labels.splice(i, 1);
      }
    },(error) => {
    }); 
  }

 /**
  *
  * @description remove reminder from the note
  */
  removeReminder(cardId){
    let id=[];
    id.push(cardId)
    let body={
      "noteIdList":id
    }
    this.UpdateService.removeReminder(body)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) =>{
      this.reminders.splice(0, 1);
    },(error) => {
    });
  }

 /**
  *
  * @description on reminder change
  */
  reminderChanges(event){
    this.reminders=[];
    this.reminders.push(event.body);
    this.checkDate(event.body);
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
    for(let i=0;i<event.length;i++){
      this.labels.push(event[i])
    }
  }
  entry(event){
    LoggerService.log("event occu",event);
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
    let body={
      "itemName":list.itemName,
      "status":list.status
    }
    this.UpdateService.updateCheckList(list.notesId, list.id, body)
    .pipe(takeUntil(this.destroy$))
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
    let body= {
      "itemName":list.itemName,
      "status":list.status
    }
    this.UpdateService.updateCheckList(list.notesId, list.id, body)
    .pipe(takeUntil(this.destroy$))
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
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) =>{
      for(let j=0;j<this.checkList.length;j++){
        if(this.checkList[j]==list)
        this.checkList.splice(j, 1);
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
    let body={
      "itemName":this.model.item,
      "status":"open"
    }
    this.UpdateService.addCheckList( this.data.noteData["id"], body )
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) =>{
      this.checkList.push(response["data"].details)
      this.model.item="";
    },(error) => {
    });
  }

 /**
  *
  * @description checking the date and printing
  */
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
      if((year==this.current.getFullYear())&&(month==this.current.getMonth())&&(date+1==this.current.getDate())){
        hr=new Date(value).getHours();
        min=new Date(value).getMinutes();
        if(new Date(value).getHours()>12){
          ampm='PM';
          hr=new Date(value).getHours()-12;
        }
        if(hr<10)
          hr='0'+hr;
        if(new Date(value).getMinutes()<10)
          min='0'+new Date(value).getMinutes();
        this.date="yesterday "+hr+":"+min+" "+ampm;
      }
      else if((year==this.current.getFullYear())&&(month==this.current.getMonth()) &&(date==this.current.getDate())){
        hr=new Date(value).getHours();
        min=new Date(value).getMinutes();
        if(new Date(value).getHours()>12){
          ampm='PM';
          hr=new Date(value).getHours()-12;
        }
        if(hr<10)
          hr='0'+hr;
        if(new Date(value).getMinutes()<10)
          min='0'+new Date(value).getMinutes();
        this.date="today "+hr+":"+min+" "+ampm;
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
        min=new Date(value).getMinutes();
        if(new Date(value).getHours()>12){
          ampm='PM';
          hr=new Date(value).getHours()-12;
        }
        if(hr<10)
          hr='0'+hr;
        if(new Date(value).getMinutes()<10)
          min='0'+new Date(value).getMinutes();
        this.date="today "+hr+":"+min+" "+ampm;
      }
      else if((year==this.current.getFullYear())&&(month==this.current.getMonth())&&(date==this.current.getDate()+1)){
        hr=new Date(value).getHours();
        min=new Date(value).getMinutes();
        if(new Date(value).getHours()>12){
          ampm='PM';
          hr=new Date(value).getHours()-12;
        }
        if(hr<10)
          hr='0'+hr;
        if(new Date(value).getMinutes()<10)
          min='0'+new Date(value).getMinutes();
        this.date="tomorrow "+hr+":"+min+" "+ampm;
      }
      else {
        this.date=value;
        return 3;
      }
      return 2;
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}