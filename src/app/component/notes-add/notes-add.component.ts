import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-notes-add',
  templateUrl: './notes-add.component.html',
  styleUrls: ['./notes-add.component.css']
})
export class NotesAddComponent implements OnInit {

  constructor(private noteAddService : HttpService) { }
  public token=localStorage.getItem("fundooUserToken");
  public id=localStorage.getItem("fundooUserId");
  public array=[];

  ngOnInit() {
    console.log("hiiiii");
    console.log(this.token);
    this.noteAddService.getDataNotes("/notes/getNotesList", this.token)
    .subscribe((response) =>{
      // console.log(response);
      // console.log(response["data"].data[0].title);
      // console.log(response["data"].data[0].description);
      for(var i=response["data"].data.length; i>0 ; i--){
        this.array.push(response["data"].data[i-1])
      }
      console.log(this.array);
    },(error) =>{
      console.log("error");
      console.log(error);
    });
  }

}
