/******************************************************************************
 *  Execution       :   1. default node         cmd> remind-me.component.ts 
 *
 *  Purpose         : To
 * 
 *  @file           : remind-me.component.ts
 *  @author         : simani meher
 *  @version        : 1.0
 *  @since          : 19-10-2018
 *
 ******************************************************************************/
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-remind-me',
  templateUrl: './remind-me.component.html',
  styleUrls: ['./remind-me.component.css']
})
export class RemindMeComponent implements OnInit {

  public remind:boolean=false;

  constructor() { }

  ngOnInit() {
  }

}
