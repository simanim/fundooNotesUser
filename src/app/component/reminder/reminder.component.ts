import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../core/services/notes/notes.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {

  constructor( private reminderService : NotesService ) { }
  public reminderArray=[];
  public arr=[];
  ngOnInit() {
    this.reminders()
  }
  reminders(){
    this.reminderService.getRemindersLIst()
    .subscribe((response) =>{
      this.reminderArray=[];
      this.arr=[]
      for(var i=response["data"].data.length;i>0;i--){
        this.reminderArray.push(response["data"].data[i-1])
      }
      this.reminderArray.sort(function(a,b)
      {
        a=new Date(a.reminder[0]);
        b=new Date(b.reminder[0]);
        return b-a;
      })
    },(error) =>{
    });
  }
  refresh(event){
    if(event){
      this.reminders();
    }
  }

}
