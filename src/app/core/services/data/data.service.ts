import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private messageSourceSearch = new BehaviorSubject('default');
  private messageSourceLabel = new BehaviorSubject('default');
  private messageSourceReminder = new BehaviorSubject('default');
  private viewSource = new BehaviorSubject(false);
  // private noteSource = new BehaviorSubject({});

  currentMessageSearch = this.messageSourceSearch.asObservable();
  currentMessageLabel = this.messageSourceLabel.asObservable();
  currentMessageView = this.viewSource.asObservable();
  currentMessageReminder = this.messageSourceReminder.asObservable();
  // currentMessageNote = this.noteSource.asObservable();

  constructor() { }

  changeMessageSearch(message: string) {
    this.messageSourceSearch.next(message)
  }
  changeMessageLabel(message: string) {
    this.messageSourceLabel.next(message)
  }
  changeMessageReminder(message: string) {
    this.messageSourceReminder.next(message)
  }
  changeView(message: boolean) {
    this.viewSource.next(message)
  }
  // changeNoteQuestion(message:object){
  //   this.noteSource.next(message)
  // }

}

