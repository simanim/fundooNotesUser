import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggerService } from '../../core/services/logger/logger.service';
import { NotesService } from '../../core/services/notes/notes.service';
import { environment } from '../../../environments/environment';
import { DataService } from '../../core/services/data/data.service';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
  styleUrls: ['./question-answer.component.scss']
})
export class QuestionAnswerComponent implements OnInit {
  @ViewChild('question') question: ElementRef ;
  @ViewChild('replayMessage') replayMessage: ElementRef ;

  constructor( private route : ActivatedRoute,private QAService : NotesService, private router : Router, 
    private data: DataService) { }
  private id = this.route.snapshot.params.noteId;
  private note:object={};
  private questions=[]
  private reply:boolean=false;
  private img;
  private id2;
  private showReply:boolean=false;
  public editorContent: string 
  ngOnInit() {
    this.getDetails();
  }
  public options: Object = {
    charCounterCount: true,
    toolbarButtons: ['fullscreen','bold', 'italic', 'underline','strikeThrough','subscript','superscript','fontFamily','fontSize',
                    'color','inlineClass','inlineStyle','paragraphStyle','lineHeight','paragraphFormat','align',
                    'formatOL','formatUL','outdent','indent','quote','specialCharacters',
                    'selectAll','undo','redo'],
    toolbarButtonsXS: ['fullscreen','bold', 'italic', 'underline','strikeThrough','subscript','superscript','fontFamily','fontSize',
                      'color','inlineClass','inlineStyle','paragraphStyle','lineHeight','paragraphFormat','align',
                      'formatOL','formatUL','outdent','indent','quote','specialCharacters',
                      'selectAll','undo','redo'],
    toolbarButtonsSM: ['fullscreen','bold', 'italic', 'underline','strikeThrough','subscript','superscript','fontFamily','fontSize',
                      'color','inlineClass','inlineStyle','paragraphStyle','lineHeight','paragraphFormat','align',
                      'formatOL','formatUL','outdent','indent','quote','specialCharacters',
                      'selectAll','undo','redo'],
    toolbarButtonsMD: ['fullscreen','bold', 'italic', 'underline','strikeThrough','subscript','superscript','fontFamily','fontSize',
                      'color','inlineClass','inlineStyle','paragraphStyle','lineHeight','paragraphFormat','align',
                      'formatOL','formatUL','outdent','indent','quote','specialCharacters',
                      'selectAll','undo','redo']
  };
  getDetails(){
    this.QAService.getNoteById(this.id)
    .subscribe( (response)=>{
      LoggerService.log("response",response);
      this.note=response["data"].data[0];
      this.questions=this.note['questionAndAnswerNotes']
      this.img=environment.Url;
      console.log(this.questions)
    },(error)=>{
      LoggerService.log("details",error);
    });
  }
  ratingValue;
  rateCheck(data){
    for(let i=0;i<data.length;i++){
      if(data[i].userId==localStorage.getItem("fundooUserId")){
        this.ratingValue=data[i].rate;
        return true
      }
    }
    this.ratingValue=0;
    return true
  }
  replyShowing(data,value){
    this.showReply=value;
    this.id2=data.id
  }
  rateCount(data){
    if(data.length==0)
    return 0;
    let value=0;
    for(let a=0;a<data.length;a++){
      value+=data[a].rate;
    }
    let rate=value/(data.length)
    return rate
  }
  addQuestion(){
    let body={
      "message":this.editorContent,
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
    this.data.hideView(false);

  }
  replyToQuestion(data){
    this.id2=data.id
    this.reply=!this.reply;
  }
  reply2;
  replyToReply(data){
    this.id2=data.id
    this.reply2=!this.reply2;
  }
  like(data){
    let body={
      "like":false
    }
    if(data.like.length==0)
      body.like=true;
    else{
      body.like=!data.like[0].like
      for(let l=0;l<data.like.length;l++){
        if(data.like[l].userId==localStorage.getItem("fundooUserId") && data.like[l].like==false)
          body.like=true;
      }
    }
    LoggerService.log("body",body)
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
    // let reply=this.replayMessage.nativeElement.innerHTML;
    let body={
      "message":this.editorContent
    }
    LoggerService.log("data",this.id2);
    LoggerService.log("body",body)
    this.QAService.addReply(body,this.id2)
    .subscribe((response)=>{
      LoggerService.log("refreshing",response)
      this.reply=this.reply2=false
      this.getDetails();
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
