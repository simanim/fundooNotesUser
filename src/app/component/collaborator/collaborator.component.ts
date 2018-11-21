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
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {

  constructor( private dialogRef : MatDialogRef<AddCollaboratorComponent>, 
  @Inject(MAT_DIALOG_DATA) private data : DialogData ) { }
  
  private img=environment.Url + localStorage.getItem("fundooUserImage");
  private firstName=localStorage.getItem("fundooUserFirstname");
  private lastName=localStorage.getItem("fundooUserLastname");
  private email=localStorage.getItem("fundooUserEmail");

  ngOnInit() {
  }

}
