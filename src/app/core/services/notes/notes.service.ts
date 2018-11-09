import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  URL="http://34.213.106.173/api";
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
  constructor( private http: HttpClient ) { }

  
/*******************Notes*****************/
  updateNotes(body){
    var path=this.URL+"/notes/updateNotes";
    return this.http.post(path,body,this.httpAuthOptions1);
  }
  addNote(body){
    var path=this.URL+"/notes/addNotes";
    return this.http.post(path,body,this.httpAuthOptions2);
  }
  deleteNote(body){
    var path=this.URL+"/notes/trashNotes";
    return this.http.post(path,body,this.httpAuthOptions1);
  }
  permanentDeleteNote(body){
    var path=this.URL+"/notes/deleteForeverNotes";
    return this.http.post(path,body,this.httpAuthOptions1);
  }
  getNoteList(){
    var path=this.URL+"/notes/getNotesList";
    return this.http.get(path,this.httpAuthOptions2)
  }
/***********************************************/


/***************archive***********************/
  archiveNote(body){
    var path=this.URL+"/notes/archiveNotes";
    return this.http.post(path,body,this.httpAuthOptions1)
  }
  getArchivedList(){
    var path=this.URL+"/notes/getArchiveNotesList";
    return this.http.get(path,this.httpAuthOptions2)
  }
/********************************************/


/******************Label********************/
  removeLabelFromNotes(cardId,labelId){
    var path=this.URL+"/notes/"+cardId+"/addLabelToNotes/"+labelId+"/remove";
    return this.http.post(path,{},this.httpAuthOptions1);
  }
  addLabelToNotes(cardId,labelId){
    var path=this.URL+"/notes/"+cardId+"/addLabelToNotes/"+labelId+"/add";
    return this.http.post(path,{},this.httpAuthOptions1);
  }
  showNoteLabels(){
    var path=this.URL+"/noteLabels/getNoteLabelList";
    return this.http.get(path,this.httpAuthOptions1);
  }
  deleteLabel(labelId){
    var path=this.URL+"/noteLabels/"+labelId+"/deleteNoteLabel"
    return this.http.delete(path);
  }
  updateLabel(labelId,body){
    var path=this.URL+"/noteLabels/"+labelId+"/updateNoteLabel"
    return this.http.post(path,body,this.httpAuthOptions1);
  }
  createLabel(body){
    var path=this.URL+"/noteLabels";
    return this.http.post(path,body,this.httpAuthOptions1);
  }
  getNotelistByLabel(label){
    var path=this.URL+"/notes/getNotesListByLabel/"+label
    return this.http.post(path,{},this.httpAuthOptions1);

  }
/*******************************************/


/******************CheckList*****************/
  updateCheckList(noteId,listId,body){
    var path=this.URL+"/notes/"+noteId+"/checklist/"+listId+"/update";
    return this.http.post(path,body,this.httpAuthOptions1);
  }
  addCheckList(noteId,body){
    var path=this.URL+"/notes/"+noteId+"/checklist/add";
    return this.http.post(path,body,this.httpAuthOptions1);
  }
  removeChecklist(noteId,listId){
    var path=this.URL+"/notes/"+noteId+"/checklist/"+listId+"/remove";
    return this.http.post(path,{},this.httpAuthOptions1);
  }
/********************************************/

  cardColorChange(body){
    var path=this.URL+"/notes/changesColorNotes";
    return this.http.post(path,body,this.httpAuthOptions1);
  }

  pinChange(body){
    var path=this.URL+"/notes/pinUnpinNotes";
    return this.http.post(path,body,this.httpAuthOptions1);
  }

  getTrashNotes(){
    var path=this.URL+"/notes/getTrashNotesList";
    return this.http.get(path,this.httpAuthOptions2)
  }


}
