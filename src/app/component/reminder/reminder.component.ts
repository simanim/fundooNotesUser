import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../core/services/notes/notes.service';
import { Note } from '../../core/model/model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {
  
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor( private reminderService : NotesService ) { }

  private notes:Note[]=[];
  private reminderArray=[];
  private arr=[];
  private spinnerValue=true;

  ngOnInit() {
    this.reminders()
  }
  reminders(){
    this.reminderService.getRemindersLIst()
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) =>{
      this.notes=[];
      this.notes=response["data"].data;
      this.reminderArray=[];
      this.arr=[]
      for(let i=this.notes.length;i>0;i--){
        this.reminderArray.push(this.notes[i-1])
      }
      this.reminderArray.sort(function(a,b)
      {
        a=new Date(a.reminder[0]);
        b=new Date(b.reminder[0]);
        return b-a;
      })
      this.spinnerValue=false
    },(error) =>{
    });
  }
  refresh(event){
    if(event){
      this.reminders();
    }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
