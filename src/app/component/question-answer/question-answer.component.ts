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
  
  ngOnInit() {
    this.getDetails();
  }
  getDetails(){
    this.QAService.getNoteById(this.id)
    .subscribe( (response)=>{
      this.note=response["data"].data[0];
      this.questions=this.note['questionAndAnswerNotes']
      LoggerService.log("notes",this.questions)
      this.img=environment.Url;
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
  replyToQuestion(data){
    this.id=data.id
    this.reply=true;
  }
  like(data){
    console.log(data);
    
    let body={
      "like":false
    }
    if(data.like.length==0)
      body.like=true;
    else
      body.like=!data.like[0].like
    this.QAService.addLike(body,data.id)
    .subscribe((response)=>{
      this.getDetails()
    },(error)=>{

    })
  }
  likeCheck(question){
    for(let m=0;m<question.length;m++){
      if(question[m].like==true){
        if(question[m].userId==localStorage.getItem("fundooUserId")){
          return true
        }
      }
    }
    return false
  }
  Check(data){
    
    for(let m=0;m<data.length;m++){
      if(data[m].like==true){
        if(data[m].userId==localStorage.getItem("fundooUserId")){
          return true
        }
      }
    }
    return false;
  }
  countLIke(data){
    let count=0
    for(let m=0;m<data.like.length;m++){
      if(data.like[m].like==true){
        count+=1;
      }
    }
    return count;
  }
  
  answer(){
    let reply=this.replayMessage.nativeElement.innerHTML;
    let body={
      "message":reply
    }
    LoggerService.log("data",this.id);
    LoggerService.log("body",body)
    this.QAService.addReply(body,this.id)
    .subscribe((response)=>{
    },(error)=>{

    })
  }
  rating(data,rate){
    let body={
      "rate":rate
    }
    this.QAService.addrating(body,data.id)
    .subscribe((response)=>{
      this.getDetails()
    },(error)=>{

    })
  }
}
