/******************************************************************************
 *  Execution       :   1. default node         cmd> trash.component.ts 
 *
 *  Purpose         : To get list of trashed notes
 * 
 *  @file           : trash.component.ts
 *  @author         : simani meher
 *  @version        : 1.0
 *  @since          : 19-10-2018
 *
 ******************************************************************************/
import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../core/services/notes/notes.service';
import { Note } from '../../core/model/model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor( private trashService : NotesService ) { }

  private notes:Note[]=[];
  private trashList=[];
  
  ngOnInit() {
    this.getTrashList();
  }

  onChange(event){
    if(event){
      this.getTrashList()
    }
  }

  /**
  * 
  * @description getting the trashed notes list
  */
  getTrashList(){
    this.trashService.getTrashNotes()
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) =>{
      this.notes=response["data"].data;
      this.trashList=[];
      for(let i=this.notes.length;i>0;i--){
        this.trashList.push(this.notes[i-1])
      }
    },(error) =>{
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
