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
import { NotesService } from '../../core/services/notes/notes.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  constructor(private labelService : NotesService, public route : ActivatedRoute) { }
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
    this.labelService.getNotelistByLabel(this.label)
    .subscribe((response) =>{
      this.labelNotesList=[];
      for(var i=response["data"].data.length;i>0;i--){
        this.labelNotesList.push(response["data"].data[i-1])
      }
    },(error) => {
    });
  }

}
