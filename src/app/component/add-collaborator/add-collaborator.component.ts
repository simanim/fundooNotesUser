/******************************************************************************
 *  Execution       :   1. default node         cmd> add-collaborator.component.ts 
 *
 *  Purpose         : To
 * 
 *  @file           : add-collaborator.component.ts
 *  @author         : simani meher
 *  @version        : 1.0
 *  @since          : 19-10-2018
 *
******************************************************************************/
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
export interface DialogData {
  noteData:object
}
@Component({
  selector: 'app-add-collaborator',
  templateUrl: './add-collaborator.component.html',
  styleUrls: ['./add-collaborator.component.scss']
})
export class AddCollaboratorComponent implements OnInit {
  
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() card;
  @Output() onChanges=new EventEmitter()
  @Output() onAddingCol=new EventEmitter()

  constructor( private dialog: MatDialog ) { }

  ngOnInit() {
  }
  addCol(){
    if(this.card){
      this.addColNote()
    }
    else{
      this.onAddingCol.emit({});
    }
  }
  addColNote(): void {
    const dialogRef = this.dialog.open(CollaboratorComponent, {
      width: '600px',
      maxWidth: 'auto',
      data: { noteData : this.card }
    });
    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      this.onChanges.emit({});
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
