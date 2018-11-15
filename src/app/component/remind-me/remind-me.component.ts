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
import { Component, OnInit, Input, Output ,EventEmitter, ViewChild } from '@angular/core';
import { NotesService } from '../../core/services/notes/notes.service';
import { LoggerService } from '../../core/services/logger/logger.service';
import { DataService } from '../../core/services/data/data.service';
import { MatMenuTrigger } from '@angular/material';
import { trigger } from '@angular/animations';

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
  @ViewChild(MatMenuTrigger) trigger:MatMenuTrigger
  message:String
  public value;
  public timePick:boolean=false;
  public currentDate=new Date();
  public button=true;
  public button1:boolean=true;public button2:boolean=true;public button3:boolean=true;public button4:boolean=true;

  constructor( private remindMeService : NotesService, private data: DataService ) { }

  ngOnInit() {
    this.data.currentMessageReminder.subscribe(message => {
      this.message = message;
      if(this.message!="default" && this.card.id==message){
        this.reminder()
        // this.trigger.openMenu();
      }
    });

  }
  reminder(){
    this.value=this.currentDate;
    if(this.card){
      if(this.card.reminder.length!=0){
        var cardReminder=new Date(this.card.reminder[0]);
        this.value=cardReminder;
        this.timePick=true;
      }
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
    this.datechange();
    
  }
  datechange(){
    if(this.model.date.getFullYear()>=this.currentDate.getFullYear()){
      if(this.model.date.getMonth()>=this.currentDate.getMonth()){
        if(this.model.date.getDate()>=this.currentDate.getDate()){
          this.button1=this.button2=this.button3=this.button4=false;
        }
      }
    }
    if(this.model.date.getFullYear()==this.currentDate.getFullYear() &&
    this.model.date.getMonth()==this.currentDate.getMonth() && 
    this.model.date.getDate()==this.currentDate.getDate()){
      if(this.currentDate.getHours()>=20 && this.currentDate.getMinutes()>=0){
        this.button1=this.button2=this.button3=this.button4=true;
      }    
      if(this.currentDate.getHours()>=18 && this.currentDate.getMinutes()>=0){
        this.button2=this.button3=this.button4=true;
      } 
      if(this.currentDate.getHours()>=13 && this.currentDate.getMinutes()>=0){
        this.button3=this.button4=true;
      } 
      if(this.currentDate.getHours()>=8 && this.currentDate.getMinutes()>=0){
        this.button4=true;
      }  
    }
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
    if(this.card){
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
    });}
    else{
    this.onChanges.emit(date)
    }
  }
  timeValidation(){
    var regex=/^(2[0-3]|1?[0-9]|0?[1-9]):[0-5][0-9] (AM|PM|pm|am|Pm|pM|Am|aM)$/;
    if(!regex.test(this.model.time)){
      this.button=false;
    }
  }
  dateValidation(){
    // console.log("innnn");
    var regex=/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    if(!regex.test(this.model.date)){
      this.button=false;
    }
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
    // console.log(date);
    
    this.addReminder(date);
  }

}
