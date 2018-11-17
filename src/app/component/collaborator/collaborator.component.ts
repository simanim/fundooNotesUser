/******************************************************************************
 *  Execution       :   1. default node         cmd> collaborator.component.ts 
 *
 *  Purpose         : To 
 * 
 *  @file           : collaborator.component.ts
 *  @author         : simani meher
 *  @version        : 1.0
 *  @since          : 19-10-2018
 *
******************************************************************************/
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddCollaboratorComponent, DialogData } from '../add-collaborator/add-collaborator.component';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {

  constructor( public dialogRef : MatDialogRef<AddCollaboratorComponent>, @Inject(MAT_DIALOG_DATA) public data : DialogData ) { }
  public img="http://34.213.106.173/" + localStorage.getItem("fundooUserImage");
  public firstName=localStorage.getItem("fundooUserFirstname");
  public lastName=localStorage.getItem("fundooUserLastname");
  public email=localStorage.getItem("fundooUserEmail");

  ngOnInit() {
  }

}
