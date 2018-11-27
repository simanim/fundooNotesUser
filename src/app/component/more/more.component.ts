/******************************************************************************
 *  Execution       :   1. default node         cmd> more.component.ts 
 *
 *  Purpose         :   
 * 
 *  @file           : more.component.ts
 *  @author         : simani meher
 *  @version        : 1.0
 *  @since          : 19-10-2018
 *
 ******************************************************************************/
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotesService } from '../../core/services/notes/notes.service';
import { MatSnackBar } from '@angular/material';
import { Label } from '../../core/model/model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoggerService } from '../../core/services/logger/logger.service';
import { Router } from '@angular/router';
import { DataService } from '../../core/services/data/data.service';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss'],
  outputs: ['onDeleteEntry']
})
export class MoreComponent implements OnInit {
  
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() card;
  @Output() onChanges = new EventEmitter(); 
  @Output() popupChange = new EventEmitter(); 
  @Output() showCheckbox = new EventEmitter();

  constructor( private MoreService : NotesService, private snackBar : MatSnackBar,private router : Router,
    private data: DataService) { }

  private labelList;
  private labelArray=[];
  private Array=[];
  private isDelete=false;
  private string="Note trashed";
  private label:Label[] = [];

  ngOnInit() {
    if(this.card){
      this.isDelete=this.card.isDeleted;
      if(this.card.isDeleted==true)this.string="Note Restored"
    }
  }

 /**
  * 
  * @description deleting the selecting note
  */
 deleteNotes(){
    if(this.card){
    let id=[];
    id.push(this.card.id);
    let body={
      "isDeleted":!this.isDelete,
      "noteIdList":id
    }
    this.MoreService.deleteNote(body)
    .subscribe((response) =>{
      this.onChanges.emit({})
      this.snackBar.open(this.string,"undo", {
        duration: 2000,
      });
      },(error) =>{
    });}
  }

 /**
  * 
  * @description getting label list
  */
  showLabel(){
    this.labelArray=[];
    this.Array=[];
    this.MoreService.showNoteLabels()
    .subscribe((response) =>{
      this.label=response["data"].details;
      this.labelList=[];
      this.labelList=this.label;
      for(let i=0;i<this.labelList.length;i++){
        this.labelList[i].isChecked=false;
        if(this.card){
        for(let j=0;j<this.card.noteLabels.length;j++){
          if(this.labelList[i].label==this.card.noteLabels[j].label){
            this.Array.push(this.labelList[i])
            this.labelList[i].isChecked=true;}
        }
      }}
    },(error) => {
    });
  }

 /**
  * 
  * @description adding label to note
  */
  addLabel(label){
    if(this.card){
    this.MoreService.addLabelToNotes(this.card.id,label.id)
    .subscribe((response) =>{
      this.onChanges.emit({})
      // for(let i=0;i<this.Array.length;i++){
      //   if(this.Array[i].id==label.id){
      //     this.Array.splice(i, 1);
      //     this.popupChange.emit(this.Array)
      //     return;
      //   }
      // }
      this.Array.push(label);
      this.popupChange.emit(this.Array)
    },(error) => {
    });}
    else{
      for(let i=0;i<this.labelArray.length;i++){
        if(this.labelArray[i].id==label.id){
          this.labelArray.splice(i, 1);
          this.onChanges.emit(this.labelArray);
          return;
        }
      }
      this.labelArray.push(label);
      this.onChanges.emit(this.labelArray);
    }
  }

 /**
  * 
  * @description remove label from list
  */
  removeLabel(label){
    this.MoreService.removeLabelFromNotes(this.card.id,label.id)
    .subscribe((response) => {
      this.onChanges.emit({})
      for(let i=0;i<this.Array.length;i++){
        if(this.Array[i].id==label.id){
          this.Array.splice(i, 1);
          this.popupChange.emit(this.Array)
          return;
        }
      }
      this.Array.push(label);
      this.popupChange.emit(this.Array)
    },(error) => {
    }); 
  }

  showCheckBox(){
    this.showCheckbox.emit({});
  }

 /**
  * 
  * @description deleting a note permanently
  */
  deleteForver(){
    if(this.card){
      let id=[];
      id.push(this.card.id);
      let body={ "noteIdList":id }
      this.MoreService.permanentDeleteNote(body)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.onChanges.emit({})
        },(error) =>{
      });
    }
  }

  questAns(){
    this.data.changeNoteQuestion(this.card)
    this.router.navigateByUrl('/QuestionAnswer')
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}