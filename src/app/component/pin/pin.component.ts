import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.css']
})
export class PinComponent implements OnInit {

  @Input() card;
  @Output() onChange = new EventEmitter;
  public token=localStorage.getItem("fundooUserToken");
  constructor( private pinService : HttpService ) { }
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
      this.pinService.postDataMore("/notes/pinUnpinNotes", 
      {
        "isPined":this.isPin,
        "noteIdList":id
      },this.token)
      .subscribe((response) =>{
        this.onChange.emit({})
      });
    }
    else
    this.onChange.emit(this.isPin);
  }
}
