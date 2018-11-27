import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data/data.service';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.scss']
})
export class QuestionAnswerComponent implements OnInit {

  constructor( private data: DataService ) { }
  private note:object;
  ngOnInit() {
    this.data.currentMessageNote
    .subscribe(message => {
      this.note = message
    })
    console.log("hiii",this.note)
  }

}
