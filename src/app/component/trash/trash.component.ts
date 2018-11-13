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

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  constructor( private trashService : NotesService ) { }
  public token=localStorage.getItem("fundooUserToken");
  public trashList=[];

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
    .subscribe((response) =>{
      this.trashList=[];
      for(var i=response["data"].data.length;i>0;i--){
        this.trashList.push(response["data"].data[i-1])
      }
    },(error) =>{
    });
  }


}
