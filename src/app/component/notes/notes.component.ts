import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  public token=localStorage.getItem("fundooUserToken");
  public id=localStorage.getItem("fundooUserId");
  public array=[];
  public noteCard:boolean=true;
  public popupCard:boolean=false;
  public star_border:boolean=true;
  public star_filled:boolean=false;
  

  constructor(private noteService : HttpService){
  }


  ngOnInit() {
    
}


  openDialog(){
    this.noteCard=!(this.noteCard);
    this.popupCard=!(this.popupCard);
  }
  send(){
    console.log("hiii")
    var title=document.getElementById("title").innerHTML;
    var description=document.getElementById("description").innerHTML;
    this.noteCard=!(this.noteCard);
    this.popupCard=!(this.popupCard);
    

    console.log(title);
    console.log(description);
    // console.log(id);
    // console.log(token);

    this.noteService.postDataReset("/notes/addNotes", {
      "title" : title,
      "description" : description,
      "labelIdList" : this.id,
      "checklist" :"yes",
      "isPined"	: false
      },this.token).subscribe((response) =>{
        console.log("success");
        // console.log(response);
      },(error) => {
        console.log("failed");
        console.log(error);
      });
  }
  star(){
    this.star_border=!(this.star_border);
    this.star_filled=!(this.star_filled);
  }

}