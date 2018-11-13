import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpService } from '../http/http.service';
import { environment } from '../../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class NotesService {
  public token=localStorage.getItem("fundooUserToken");
  public httpAuthOptions1 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    })
  };
  public httpAuthOptions2 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': this.token
    })
  };
  constructor( private service: HttpService ) { }

  
/*******************Notes*****************/
  updateNotes(body){
    var path=environment.baseUrl+"/notes/updateNotes";
    return this.service.postData(path,body,this.httpAuthOptions1);

  }
  addNote(body){
    var path=environment.baseUrl+"/notes/addNotes";
    return this.service.postData(path,body,this.httpAuthOptions2);

  }
  deleteNote(body){
    var path=environment.baseUrl+"/notes/trashNotes";
    return this.service.postData(path,body,this.httpAuthOptions1);
  }
  permanentDeleteNote(body){
    var path=environment.baseUrl+"/notes/deleteForeverNotes";
    return this.service.postData(path,body,this.httpAuthOptions1);
  }
  getNoteList(){
    var path=environment.baseUrl+"/notes/getNotesList";
    return this.service.getData(path,this.httpAuthOptions2);
  }
/***********************************************/


/***************archive***********************/
  archiveNote(body){
    var path=environment.baseUrl+"/notes/archiveNotes";
    return this.service.postData(path,body,this.httpAuthOptions1);
  }
  getArchivedList(){
    var path=environment.baseUrl+"/notes/getArchiveNotesList";
    return this.service.getData(path,this.httpAuthOptions2);
  }
/********************************************/


/******************Label********************/
  removeLabelFromNotes(cardId,labelId){
    var path=environment.baseUrl+"/notes/"+cardId+"/addLabelToNotes/"+labelId+"/remove";
    return this.service.postData(path,{},this.httpAuthOptions1);
  }
  addLabelToNotes(cardId,labelId){
    var path=environment.baseUrl+"/notes/"+cardId+"/addLabelToNotes/"+labelId+"/add";
    return this.service.postData(path,{},this.httpAuthOptions1);
  }
  showNoteLabels(){
    var path=environment.baseUrl+"/noteLabels/getNoteLabelList";
    return this.service.getData(path,this.httpAuthOptions1);
  }
  deleteLabel(labelId){
    var path=environment.baseUrl+"/noteLabels/"+labelId+"/deleteNoteLabel";
    return this.service.deleteData(path);
  }
  updateLabel(labelId,body){
    var path=environment.baseUrl+"/noteLabels/"+labelId+"/updateNoteLabel";
    return this.service.postData(path,body,this.httpAuthOptions1);
  }
  createLabel(body){
    var path=environment.baseUrl+"/noteLabels";
    return this.service.postData(path,body,this.httpAuthOptions1);
  }
  getNotelistByLabel(label){
    var path=environment.baseUrl+"/notes/getNotesListByLabel/"+label;
    return this.service.postData(path,{},this.httpAuthOptions1);
  }
/*******************************************/


/******************CheckList*****************/
  updateCheckList(noteId,listId,body){
    var path=environment.baseUrl+"/notes/"+noteId+"/checklist/"+listId+"/update";
    return this.service.postData(path,body,this.httpAuthOptions1);
  }
  addCheckList(noteId,body){
    var path=environment.baseUrl+"/notes/"+noteId+"/checklist/add";
    return this.service.postData(path,body,this.httpAuthOptions1);
  }
  removeChecklist(noteId,listId){
    var path=environment.baseUrl+"/notes/"+noteId+"/checklist/"+listId+"/remove";
    return this.service.postData(path,{},this.httpAuthOptions1);
  }
/********************************************/

  cardColorChange(body){
    var path=environment.baseUrl+"/notes/changesColorNotes";
    return this.service.postData(path,body,this.httpAuthOptions1);
  }

  pinChange(body){
    var path=environment.baseUrl+"/notes/pinUnpinNotes";
    return this.service.postData(path,body,this.httpAuthOptions1);
  }

  getTrashNotes(){
    var path=environment.baseUrl+"/notes/getTrashNotesList";
    return this.service.getData(path,this.httpAuthOptions2);
  }

  addUpdateReminder(body){
    var path=environment.baseUrl+"/notes/addUpdateReminderNotes";
    return this.service.postData(path,body,this.httpAuthOptions1);
  }

  removeReminder(body){
    var path=environment.baseUrl+"/notes/removeReminderNotes";
    return this.service.postData(path,body,this.httpAuthOptions1);

  }

}
