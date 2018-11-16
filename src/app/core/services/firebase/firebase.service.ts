import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  messaging;

  constructor() {
    firebase.initializeApp({
      'messagingSenderId': '263147610417'
    });
    
    this.messaging = firebase.messaging();
    
   }
  getPermission() {
    this.messaging.requestPermission()
    .then(() => {
      return this.messaging.getToken()
    })
    .then(token => {
      localStorage.setItem("fundooUserPushToken",token)
    })
    .catch((err) => {
    });
  }

  receiveMessage() {
     this.messaging.onMessage((payload) => {
    });

  }

}
