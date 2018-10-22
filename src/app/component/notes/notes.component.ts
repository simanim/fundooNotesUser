import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  public noteCard:boolean=true;
  public popupCard:boolean=false;
  public star_border:boolean=true;
  public star_filled:boolean=false
  constructor() { }

  ngOnInit() {
  }
  openDialog(){
    this.noteCard=!(this.noteCard);
    this.popupCard=!(this.popupCard);
  }
  star(){
    this.star_border=!(this.star_border);
    this.star_filled=!(this.star_filled);
  }
}
