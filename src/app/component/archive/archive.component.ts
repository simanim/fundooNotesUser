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
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  constructor( private archiveService : HttpService ) { }
  public token=localStorage.getItem("fundooUserToken");
  public archiveList=[];

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
    this.archiveService.getDataNotes("/notes/getArchiveNotesList",this.token)
    .subscribe((response) =>{
      this.archiveList=[];
      for(var i=response["data"].data.length;i>0;i--){
        if(response["data"].data[i-1]["isDeleted"] == false)
        this.archiveList.push(response["data"].data[i-1])
      }
    },(error) =>{
    });
  }

}