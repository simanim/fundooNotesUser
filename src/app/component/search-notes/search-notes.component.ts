import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data/data.service';
import { NotesService } from '../../core/services/notes/notes.service';
import { Note } from '../../core/model/model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search-notes',
  templateUrl: './search-notes.component.html',
  styleUrls: ['./search-notes.component.scss']
})
export class SearchNotesComponent implements OnInit {
  
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor( private data: DataService, private searchService : NotesService ) { }

  private notes:Note[]=[];
  private message : string;
  private notesArray=[];

  ngOnInit() {
    this.getNotes();
   /**
    * 
    * @description getting search word
    */
    this.data.currentMessageSearch
    .pipe(takeUntil(this.destroy$))
    .subscribe(message => {
      this.message = message;
    })
  }

 /**
  * 
  * @description getting user note list
  */
  getNotes(){
    this.searchService.getNoteList()
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) =>{
      this.notes=response["data"].data
      this.notesArray=[];
      for(let i=this.notes.length; i>0 ; i--){
        if((this.notes[i-1]["isDeleted"] == false) && (this.notes[i-1]["isArchived"] == false)){
        this.notesArray.push(this.notes[i-1])
        }
      }
    },(error) =>{
    });
  }
  
 /**
  * 
  * @description unsubscribing
  */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
