import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotesService } from '../../core/services/notes/notes.service';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {

  @Input() card;
  @Output() onChange = new EventEmitter;
  public token=localStorage.getItem("fundooUserToken");
  constructor( private pinService : NotesService ) { }
  public isPin:boolean=false;

  ngOnInit() {
    if(this.card)
    this.isPin=this.card.isPined;
  }
  pin(){
    this.isPin=!this.isPin;
    if(this.card){
      var id=[];
      id.push(this.card.id);
      var body={
        "isPined":this.isPin,
        "noteIdList":id
      }
      this.pinService.pinChange(body)
      .subscribe((response) =>{
        this.onChange.emit({})
      });
    }
    else
    this.onChange.emit(this.isPin);
  }
}
