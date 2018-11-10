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
import {FormControl} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment1 from 'moment';
import * as _moment from 'moment';

const moment = _moment1 || _moment;
// import {default as _rollupMoment} from 'moment';
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-remind-me',
  templateUrl: './remind-me.component.html',
  styleUrls: ['./remind-me.component.css'],
  providers:[    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

  {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
]
})
export class RemindMeComponent implements OnInit {
  date = new FormControl(moment());

  @Input() card
  @Output() onChanges=new EventEmitter()
  public remind:boolean=false;
  constructor( private remindMeService : NotesService ) { }

  ngOnInit() {
  }
  today(){
    var currentDate=new Date();
    var id=[];
    id.push(this.card.id);
    var body={
      "reminder":new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate()+0,20,0,0),
      "noteIdList":id
    }
    this.addReminder(body);
  }
  tomorrow(){
    var currentDate=new Date();
    var id=[];
    id.push(this.card.id);

    var body={
      "reminder":new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate()+1,8,0,0),
      "noteIdList":id
    }
    this.addReminder(body);
  }
  nextWeek(){
    var currentDate=new Date();
    var id=[];
    id.push(this.card.id);

    var body={
      "reminder":new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate()+7,8,0,0),
      "noteIdList":id
    }
    this.addReminder(body);
  }
  addReminder(body){
  this.remindMeService.addUpdateReminder(body)
  .subscribe((response) =>{
    this.onChanges.emit({})
  },(error) =>{
  });
  }

}
