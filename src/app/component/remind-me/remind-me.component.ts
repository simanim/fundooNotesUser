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
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-remind-me',
  templateUrl: './remind-me.component.html',
  styleUrls: ['./remind-me.component.scss'],
})
export class RemindMeComponent implements OnInit {
  
  destroy$: Subject<boolean> = new Subject<boolean>(); 
  @Input() card;
  @Output() onChanges=new EventEmitter();
  @ViewChild(MatMenuTrigger) trigger:MatMenuTrigger;

  constructor( private remindMeService : NotesService, private data: DataService ) { }

  private model: any={
    "date":'',
    'time':''
   };
  private message:String;
  private  value;
  private timePick:boolean=false;
  private currentDate=new Date();
  private button=true;
  private button1:boolean=true;
  private button2:boolean=true;
  private button3:boolean=true;
  private button4:boolean=true;


  ngOnInit() {
    this.data.currentMessageReminder.subscribe(message => {
      this.message = message;
      if(this.message!="default" && this.card.id==message){
        this.reminder()
        // this.trigger.openMenu();
      }
    });

  }

 /**
  * 
  * @description reminder show
  */
  reminder(){
    this.value=this.currentDate;
    if(this.card){
      if(this.card.reminder.length!=0){
        let cardReminder=new Date(this.card.reminder[0]);
        this.value=cardReminder;
        this.timePick=true;
      }
    }
    this.model.date=this.value;
    let hr=this.value.getHours();
    let min=this.value.getMinutes()+1;
    if(min>=0 && min<9)
    min="0"+(min);
    let ampm='AM'
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
    let date=new Date(this.currentDate.getFullYear(),this.currentDate.getMonth(),this.currentDate.getDate()+0,20,0,0)
    if(this.card){
      this.addReminder(date);
    }
    else{
    this.onChanges.emit(date)
    }
  }
  tomorrow(){
    let date=new Date(this.currentDate.getFullYear(),this.currentDate.getMonth(),this.currentDate.getDate()+1,8,0,0)
    if(this.card){
      this.addReminder(date);
    }
    else{
      this.onChanges.emit(date)
    }
  }
  nextWeek(){
    let date=new Date(this.currentDate.getFullYear(),this.currentDate.getMonth(),this.currentDate.getDate()+7,8,0,0)
    if(this.card){
      this.addReminder(date);
    }
    else{
      this.onChanges.emit(date)
    }
  }
  addReminder(date){
    if(this.card){
    let id=[];
    id.push(this.card.id);
    let body={
      "reminder":date,
      "noteIdList":id
    }
    this.remindMeService.addUpdateReminder(body)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) =>{
    this.onChanges.emit({"body":date})
    },(error) =>{
    });}
    else{
    this.onChanges.emit(date)
    }
  }
  timeValidation(){
    let regex=/^(2[0-3]|1?[0-9]|0?[1-9]):[0-5][0-9] (AM|PM|pm|am|Pm|pM|Am|aM)$/;
    if(!regex.test(this.model.time)){
      this.button=false;
    }
    else
    this.button=true;


  }
  dateValidation(){
    let regex=/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    if(!regex.test(this.model.date)){
      this.button=false;
    }
    else
      this.button=true;
  }
  
  addTime(){
    let arr=this.model.time.split(' ');
    let arr2=arr[0].split(':')
    arr2.push(arr[1])
    let min=Number(arr2[1]);
    let hr=Number(arr2[0]);
    if(arr2[2].toUpperCase()=="PM" && hr<12){
      hr+=12;
    }
    let date=new Date(this.model.date.getFullYear(),this.model.date.getMonth(),this.model.date.getDate()+0,hr,min,0)
    this.addReminder(date);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
