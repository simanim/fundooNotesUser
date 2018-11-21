/******************************************************************************
 *  Execution       :   1. default node         cmd> create-label.component.ts 
 *
 *  Purpose         : To create label
 * 
 *  @file           : create-label.component.ts
 *  @author         : simani meher
 *  @version        : 1.0
 *  @since          : 19-10-2018
 *
******************************************************************************/
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NavbarComponent } from '../navbar/navbar.component';
import { NotesService } from '../../core/services/notes/notes.service';
import { Label } from '../../core/model/model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-create-label',
  templateUrl: './create-label.component.html',
  styleUrls: ['./create-label.component.scss']
})
export class CreateLabelComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  public model : any = {
    "labelName":"",
    "newName":""
  }
  constructor( private dialogRef : MatDialogRef<NavbarComponent>, private NoteAddService : NotesService ) { }

  private label:Label[] = [];
  private id=localStorage.getItem("fundooUserId");
  private labelList=[];
  private labelId;

  ngOnInit() {
    this.show();
  }
  editIcon(id,labelNew){
    this.labelId=[];
    this.labelId=id;
    this.model.newName=labelNew;
  }

  add(){
    this.done();
    this.dialogRef.close();
  }
  
  clear(){
    this.model.labelName=null;
  }

 /**
  * 
  * @description getting the list of labels
  */
  show(){
    this.NoteAddService.showNoteLabels()
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) =>{
      this.label=response["data"].details
      this.labelList=[];
      this.labelList=this.label;
      return;
    },(error) => {
    });
  }

 /**
  * 
  * @description deleting a label from list
  */
  delete(labelId){
    this.NoteAddService.deleteLabel(labelId)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) =>{
      this.show();
    },(error) => {
    });
  }
 /**
  * 
  * @description updating a label from list
  */
  update(labelId){ 
    let label=this.model.newName;
    let body={ "label":label }
    this.NoteAddService.updateLabel(labelId,body)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) =>{
      this.show();
    },(error) => {
    });
  }
 /**
  * 
  * @description adding a label to list
  */
  done(){
    let label=this.model.labelName;
    if(label==""){
      this.dialogRef.close();
      return false;
    }
    let body= {
      "label": label,
      "isDeleted": false,
      "userId":this.id
    }
    this.NoteAddService.createLabel(body)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) =>{
      this.show();
      this.model.labelName=null;
    },(error) => {
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
