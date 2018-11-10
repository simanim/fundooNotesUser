import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private messageSource = new BehaviorSubject('default message');
  private viewSource = new BehaviorSubject(false);

  currentMessage = this.messageSource.asObservable();
  currentMessage1 = this.viewSource.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  changeView(message: boolean) {
    this.viewSource.next(message)
  }

}

