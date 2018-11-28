import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggerService } from '../../core/services/logger/logger.service';
import { NotesService } from '../../core/services/notes/notes.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.scss']
})
export class QuestionAnswerComponent implements OnInit {
  @ViewChild('question') question: ElementRef ;
  @ViewChild('replayMessage') replayMessage: ElementRef ;

  constructor( private route : ActivatedRoute,private QAService : NotesService, private router : Router) { }
  private id = this.route.snapshot.params.noteId;
  private note:object={};
  private questions=[]
  private reply:boolean=false;
  private img;
  starValue;
  ngOnInit() {
    LoggerService.log("ID",this.id)
    this.getDetails();
  }

  getDetails(){
    this.QAService.getNoteById(this.id)
    .subscribe( (response)=>{
    this.note=response["data"].data[0];
    this.questions=this.note["questionAndAnswerNotes"][0];
    LoggerService.log("details",this.questions)

      LoggerService.log("details",this.questions["user"].email)
      this.img=environment.Url+this.questions["user"].imageUrl;
    },(error)=>{
    });
  }
  addQuestion(){
    let body={
      "message":this.question.nativeElement.innerHTML,
      "notesId":this.id
    }
    this.QAService.addAQuestion(body)
    .subscribe((response)=>{
      this.getDetails()
    },(error)=>{
    })
  }
  close(){
    this.router.navigateByUrl('/home');
  }
  replyToQuestion(){
    this.reply=true;
  }
  like(data){
    let body={
      "like":true
    }
    LoggerService.log("hiii",data)

    LoggerService.log("hiii",data.id)
    this.QAService.addLike(body,data.id)
    .subscribe((response)=>{
      LoggerService.log("success",response);
    },(error)=>{
      LoggerService.log("success",error);

    })
  }
  answer(data){
    let reply=this.replayMessage.nativeElement.innerHTML;
    LoggerService.log("reply",reply);
    LoggerService.log("data",data)
    let body={
      "message":reply
    }
    this.QAService.addReply(body,data.id)
    .subscribe((response)=>{
      LoggerService.log("success",response);
    },(error)=>{
      LoggerService.log("success",error);

    })
  }
  rating(){
    
    
    console.log("rating",this.starValue);
    
  }
}
