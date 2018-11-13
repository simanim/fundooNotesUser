/******************************************************************************
 *  Execution       :   1. default node         cmd> dashboard.component.ts 
 *
 *  Purpose         : To display the dashboard
 * 
 *  @file           : dashboard.component.ts
 *  @author         : simani meher
 *  @version        : 1.0
 *  @since          : 19-10-2018
 *
******************************************************************************/
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public token=localStorage.getItem("fundooUserToken");

  
  constructor() { }

  ngOnInit() {
  }
}
