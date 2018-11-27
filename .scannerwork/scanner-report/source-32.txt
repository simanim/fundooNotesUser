import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }
  static log(msg : String , obj = {} ): void{
    console.log(msg, obj);
  }
  static error(msg : String , obj = {} ): void{
    console.error(msg, obj);
  }
}
