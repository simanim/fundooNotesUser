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
  ngOnInit() {
    this.reminders()
  }
  reminders(){
    this.reminderService.getRemindersLIst()
    .subscribe((response) =>{
      this.reminderArray=[];
      for(var i=response["data"].data.length;i>0;i--){
        this.reminderArray.push(response["data"].data[i-1])
      }
    },(error) =>{
      
    });
  }
  refresh(event){
    if(event){
      this.reminders();
    }
  }

}
