import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotesService } from '../../core/services/notes/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() card;
  @Output() onChange = new EventEmitter;

  constructor( private pinService : NotesService ) { }
  
  private isPin:boolean=false;

  ngOnInit() {
    if(this.card)
    this.isPin=this.card.isPined;
  }
  pin(){
    this.isPin=!this.isPin;
    if(this.card){
      let id=[];
      id.push(this.card.id);
      let body={
        "isPined":this.isPin,
        "noteIdList":id
      }
      this.pinService.pinChange(body)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) =>{
        this.onChange.emit({})
      });
    }
    else
    this.onChange.emit(this.isPin);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
