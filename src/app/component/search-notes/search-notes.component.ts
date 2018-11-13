import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data/data.service';
import { NotesService } from '../../core/services/notes/notes.service';

@Component({
  selector: 'app-search-notes',
  templateUrl: './search-notes.component.html',
  styleUrls: ['./search-notes.component.scss']
})
export class SearchNotesComponent implements OnInit {
  message : string
  constructor( private data: DataService, private searchService : NotesService ) { }
  public notesArray=[];
  public token=localStorage.getItem("fundooUserToken")
  ngOnInit() {
    this.getNotes()
    this.data.currentMessage.subscribe(message => {
      this.message = message
    })
  }

  getNotes(){
    this.searchService.getNoteList()
    .subscribe((response) =>{
      this.notesArray=[];
      for(var i=response["data"].data.length; i>0 ; i--){
        if((response["data"].data[i-1]["isDeleted"] == false) && (response["data"].data[i-1]["isArchived"] == false)){
        this.notesArray.push(response["data"].data[i-1])
        }
      }
    },(error) =>{
    });
  }


}
