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

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss'],
  outputs: ['onDeleteEntry']
})
export class MoreComponent implements OnInit {

  @Input() card;
  @Output() onChanges = new EventEmitter(); 
  @Output() popupChange = new EventEmitter(); 
  @Output() showCheckbox = new EventEmitter();
  public labelList;
  public token=localStorage.getItem("fundooUserToken");
  public arr=[];
  public arr2=[];
  constructor( private MoreService : NotesService, public snackBar : MatSnackBar) { }
  public isDelete=false;
  public string="Note trashed"
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
    var id=[];
    id.push(this.card.id);
    var body={
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
    this.arr=[];
    this.arr2=[];
    this.MoreService.showNoteLabels()
    .subscribe((response) =>{
      this.labelList=[];
      this.labelList=response["data"].details;
      for(var i=0;i<this.labelList.length;i++){
        this.labelList[i].isChecked=false;
        if(this.card){
        for(var j=0;j<this.card.noteLabels.length;j++){
          if(this.labelList[i].label==this.card.noteLabels[j].label){
            this.arr2.push(this.labelList[i])
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
      for(var i=0;i<this.arr2.length;i++){
        if(this.arr2[i].id==label.id){
          this.arr2.splice(i, 1);
          this.popupChange.emit(this.arr2)
          return;
        }
      }
      this.arr2.push(label);
      this.popupChange.emit(this.arr2)
    },(error) => {
    });}
    else{
      for(var i=0;i<this.arr.length;i++){
        if(this.arr[i].id==label.id){
          this.arr.splice(i, 1);
          this.onChanges.emit(this.arr);
          return;
        }
      }
      this.arr.push(label);
      this.onChanges.emit(this.arr);
    }
  }
 /**
  * 
  * @description remove label from list
  */
  removeLabel(label){
    this.MoreService.removeLabelFromNotes(this.card.id,label.id)
    .subscribe((response) =>{
      this.onChanges.emit({})
      for(var i=0;i<this.arr2.length;i++){
        if(this.arr2[i].id==label.id){
          this.arr2.splice(i, 1);
          this.popupChange.emit(this.arr2)
          return;
        }
      }
      this.arr2.push(label);
      this.popupChange.emit(this.arr2)
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
      var id=[];
      id.push(this.card.id);
      var body={ "noteIdList":id }
      this.MoreService.permanentDeleteNote(body)
      .subscribe((response) =>{
        this.onChanges.emit({})
        },(error) =>{
      });}
  }

}