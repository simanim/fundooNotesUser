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
import { Label } from '../../core/model/model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor( private labelService : NotesService, private route : ActivatedRoute ) { }

  private label:Label[] = [];
  private labelNotesList=[];
  private labelName='';

  ngOnInit() {
    this.route.params.subscribe((params: Params) =>{
      this.labelName=params['label'];
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
    this.labelService.getNotelistByLabel(this.labelName)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) =>{
      this.label=response["data"].data;
      this.labelNotesList=[];
      for(let i=this.label.length;i>0;i--){
        this.labelNotesList.push(this.label[i-1])
      }
      console.log(this.labelNotesList);
      
    },(error) => {
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
