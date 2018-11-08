/******************************************************************************
 *  Execution       :   1. default node         cmd> label.component.ts 
 *
 *  Purpose         : To send a request to registered email id if user has forgotten password
 * 
 *  @file           : label.component.ts
 *  @author         : simani meher
 *  @version        : 1.0
 *  @since          : 19-10-2018
 *
******************************************************************************/
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit {

  constructor(private labelService : HttpService, public route : ActivatedRoute) { }
  public labelNotesList=[];
  public token = localStorage.getItem("fundooUserToken");
  public label='';
  ngOnInit() {
    this.route.params.subscribe((params: Params) =>{
      this.label=params['label'];
      this.labelNotes();

    })
  }

  refresh(event){
    if(event){
      this.labelNotes();
    }
  }

 /**
  * 
  * @description getting the notes according to label
  */
  labelNotes(){
    this.labelService.postDataMore("/notes/getNotesListByLabel/"+this.label,{},this.token)
    .subscribe((response) =>{
      this.labelNotesList=[];
      for(var i=response["data"].data.length;i>0;i--){
        this.labelNotesList.push(response["data"].data[i-1])
      }
    },(error) => {
    });
  }

}
