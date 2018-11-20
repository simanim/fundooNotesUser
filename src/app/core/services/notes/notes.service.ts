import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  constructor( private service: HttpService ) { }

  
/*******************Notes*****************/
  updateNotes(body){
    return this.service.postDataForJSON("/notes/updateNotes",body);
  }
  addNote(body){
    return this.service.postDataForEncoded("/notes/addNotes",body);
  }
  deleteNote(body){
    return this.service.postDataForJSON("/notes/trashNotes",body);
  }
  permanentDeleteNote(body){
    return this.service.postDataForJSON("/notes/deleteForeverNotes",body);
  }
  getNoteList(){
    return this.service.getData2("/notes/getNotesList");
  }
/***********************************************/


/***************archive***********************/
  archiveNote(body){
    return this.service.postDataForJSON("/notes/archiveNotes",body);
  }
  getArchivedList(){
    return this.service.getData2("/notes/getArchiveNotesList");
  }
/**********************************************/


/*********************Label********************/
  removeLabelFromNotes(cardId,labelId){
    return this.service.postDataForJSON("/notes/"+cardId+"/addLabelToNotes/"+labelId+"/remove",{});
  }
  addLabelToNotes(cardId,labelId){
    return this.service.postDataForJSON("/notes/"+cardId+"/addLabelToNotes/"+labelId+"/add",{});
  }
  showNoteLabels(){
    return this.service.getData2("/noteLabels/getNoteLabelList");
  }
  deleteLabel(labelId){
    return this.service.deleteData("/noteLabels/"+labelId+"/deleteNoteLabel");
  }
  updateLabel(labelId,body){
    return this.service.postDataForJSON("/noteLabels/"+labelId+"/updateNoteLabel",body);
  }
  createLabel(body){
    return this.service.postDataForJSON("/noteLabels",body);
  }
  getNotelistByLabel(label){
    return this.service.postDataForJSON("/notes/getNotesListByLabel/"+label,{});
  }
/*******************************************/


/******************CheckList*****************/
  updateCheckList(noteId,listId,body){
    return this.service.postDataForJSON("/notes/"+noteId+"/checklist/"+listId+"/update",body);
  }
  addCheckList(noteId,body){
    return this.service.postDataForJSON("/notes/"+noteId+"/checklist/add",body);
  }
  removeChecklist(noteId,listId){
    return this.service.postDataForJSON("/notes/"+noteId+"/checklist/"+listId+"/remove",{});
  }
/********************************************/

  cardColorChange(body){
    return this.service.postDataForJSON("/notes/changesColorNotes",body);
  }
  pinChange(body){
    return this.service.postDataForJSON("/notes/pinUnpinNotes",body);
  }
  getTrashNotes(){
    return this.service.getData2("/notes/getTrashNotesList");
  }

  addUpdateReminder(body){
    return this.service.postDataForJSON("/notes/addUpdateReminderNotes",body);
  }

  removeReminder(body){
    return this.service.postDataForJSON("/notes/removeReminderNotes",body);
  }
  getRemindersLIst(){
    return this.service.getData2("/notes/getReminderNotesList");
  }

}
