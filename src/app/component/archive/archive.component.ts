/******************************************************************************
 *  Execution       :   1. default node         cmd> archive.component.ts 
 *
 *  Purpose         : To get the list of archived notes
 * 
 *  @file           : archive.component.ts
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
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor( private archiveService : NotesService ) { }

  private archiveList = [];
  private notes:Note[] = [];

  ngOnInit() {
    this.getArchiveList();
  }

  refresh(event){
    if(event){
      this.getArchiveList();
    }
  }

 /** 
  * 
  * @description getting the archieved note list
  */
  getArchiveList(){
    this.archiveService.getArchivedList()
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) =>{
      this.notes=response["data"].data;
      this.archiveList=[];
      for(let i=this.notes.length;i>0;i--){
        if(this.notes[i-1]["isDeleted"] == false)
        this.archiveList.push(this.notes[i-1])
      }
    },(error) =>{
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}