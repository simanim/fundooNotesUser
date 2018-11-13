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


@Component({
  selector: 'app-create-label',
  templateUrl: './create-label.component.html',
  styleUrls: ['./create-label.component.scss']
})
export class CreateLabelComponent implements OnInit {
  @ViewChild('labelName') labelName: ElementRef;
  @ViewChild('newName') newName: ElementRef;

  constructor( public dialogRef : MatDialogRef<NavbarComponent>, private NoteAddService : NotesService ) { }
  public token=localStorage.getItem("fundooUserToken");
  public id=localStorage.getItem("fundooUserId");
  public labelList;
  public labelId;
  ngOnInit() {
    this.show();
  }
  editIcon(id){
    this.labelId=[];
    this.labelId=id;
  }

  add(){
    this.done();
    this.dialogRef.close();
  }
  
  clear(){
    this.labelName.nativeElement.innerHTML=null;
  }

 /**
  * 
  * @description getting the list of labels
  */
  show(){
    this.NoteAddService.showNoteLabels()
    .subscribe((response) =>{
      this.labelList=[];
      this.labelList=response["data"].details;
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
    var label=this.newName.nativeElement.innerHTML
    var body={ "label":label }
    this.NoteAddService.updateLabel(labelId,body)
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
    var label=this.labelName.nativeElement.innerHTML
    if(label==""){
      this.dialogRef.close();
      return false;
    }
    var body= {
      "label": label,
      "isDeleted": false,
      "userId":this.id
    }
    this.NoteAddService.createLabel(body)
    .subscribe((response) =>{
      this.show();
      this.labelName.nativeElement.innerHTML=null;
    },(error) => {
    });
  }

}
