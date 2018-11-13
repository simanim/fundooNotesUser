/******************************************************************************
 *  Execution       :   1. default node         cmd> remind-me.component.ts 
 *
 *  Purpose         : To
 * 
 *  @file           : remind-me.component.ts
 *  @author         : simani meher
 *  @version        : 1.0
 *  @since          : 19-10-2018
 *
 ******************************************************************************/
import { Component, OnInit, Input, Output ,EventEmitter } from '@angular/core';
import { NotesService } from '../../core/services/notes/notes.service';

@Component({
  selector: 'app-remind-me',
  templateUrl: './remind-me.component.html',
  styleUrls: ['./remind-me.component.scss'],
})
export class RemindMeComponent implements OnInit {
  model: any={
   "date":'',
   'time':''
  }
  @Input() card
  @Output() onChanges=new EventEmitter()

  public value;
  public timePick:boolean=false;
  // public currentDate;
  public currentDate=new Date();
  constructor( private remindMeService : NotesService ) { }

  ngOnInit() {
    // this.currentDate=new Date(this.date.getFullYear(),this.date.getMonth(),this.date.getDate()+0,this.date.getHours(),
    // this.date.getMinutes(),this.date.getSeconds())
    // console.log(this.date);
    
  }
  reminder(){
    this.value=this.currentDate;
    if(this.card.reminder.length!=0){
      var cardReminder=new Date(this.card.reminder[0]);
      this.value=cardReminder;
    }
    this.model.date=this.value;
    var hr=this.value.getHours();
    var min=this.value.getMinutes();
    if(min>=0 && min<9)
    min="0"+min;
    var ampm='AM'
    if(hr>12){
      hr-=12;
      ampm='PM'
    }
    this.model.time=hr+":"+min+" "+ampm;
  }
  today(){
    var date=new Date(this.currentDate.getFullYear(),this.currentDate.getMonth(),this.currentDate.getDate()+0,20,0,0)
    if(this.card){
      this.addReminder(date);
    }
    else{
    this.onChanges.emit(date)
    }
  }
  tomorrow(){
    var date=new Date(this.currentDate.getFullYear(),this.currentDate.getMonth(),this.currentDate.getDate()+1,8,0,0)
    if(this.card){
      this.addReminder(date);
    }
    else{
      this.onChanges.emit(date)
    }
  }
  nextWeek(){
    var date=new Date(this.currentDate.getFullYear(),this.currentDate.getMonth(),this.currentDate.getDate()+7,8,0,0)
    if(this.card){
      this.addReminder(date);
    }
    else{
      this.onChanges.emit(date)
    }
  }
  addReminder(date){
    var id=[];
    id.push(this.card.id);
    var body={
      "reminder":date,
      "noteIdList":id
    }
    this.remindMeService.addUpdateReminder(body)
    .subscribe((response) =>{
      this.onChanges.emit({"body":date})
    },(error) =>{
    });
  }
  addTime(){
    var arr=this.model.time.split(' ');
    var arr2=arr[0].split(':')
    arr2.push(arr[1])
    var min=Number(arr2[1]);
    var hr=Number(arr2[0]);
    if(arr2[2].toUpperCase()=="PM" && hr<12){
      hr+=12;
    }
    var date=new Date(this.model.date.getFullYear(),this.model.date.getMonth(),this.model.date.getDate()+0,hr,min,0)
    this.addReminder(date);
    

  }

}
