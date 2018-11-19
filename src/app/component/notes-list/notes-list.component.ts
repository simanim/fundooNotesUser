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
import { DataService } from '../../core/services/data/data.service'

export interface DialogData {
  noteData:object
}

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  outputs: ['anyChanges']
})
export class NotesListComponent implements OnInit {

  noteData:object;
  public token= localStorage.getItem("fundooUserToken")
  @Input() pin;
  @Input() length;

  @Input() notes;

  @Input() searchItem;
  @Output() anyChanges= new EventEmitter();
  constructor( public dialog: MatDialog, private noteListService : NotesService, private data: DataService ) { }
  public current =new Date();
  public dateValue;
  view:boolean;
  public aaa=[true,false];
  
  ngOnInit() {
    this.data.currentMessageView.subscribe(message => {
      this.view = message      
    })
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
  date;
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
        if(hr<10){
          hr='0'+hr;
        }
        if(new Date(value).getMinutes()<10){
          min='0'+new Date(value).getMinutes();
        }
        this.date="yesterday "+hr+":"+min+" "+ampm;
      }
      else if((year==this.current.getFullYear())&&(month==this.current.getMonth()) &&(date==this.current.getDate())){
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
  showLabel(data){
    this.data.changeMessageLabel(data)
  }
  showReminder(data){
    this.data.changeMessageReminder(data)
  }
}
