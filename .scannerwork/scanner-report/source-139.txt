/******************************************************************************
 *  Execution       :   1. default node         cmd> change-color.component.ts 
 *
 *  Purpose         : To change the color of the particular note
 * 
 *  @file           : change-color.component.ts
 *  @author         : simani meher
 *  @version        : 1.0
 *  @since          : 19-10-2018
 *
******************************************************************************/
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotesService } from '../../core/services/notes/notes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-change-color',
  templateUrl: './change-color.component.html',
  styleUrls: ['./change-color.component.scss']
})
export class ChangeColorComponent implements OnInit {
  
  destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() card;
  @Output() onChangeColor = new EventEmitter()

  constructor(private changeColorService : NotesService) { }

  ngOnInit() {
  }
  
  /**
  * 
  * @description changing the color of particular note
  */
  colorChange(color){
    if(this.card){
      let id=[];
      id.push(this.card.id);
      let body={
        "color":color,
        "noteIdList":id
      }
      this.changeColorService.cardColorChange(body)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) =>{
      this.onChangeColor.emit(color)
      },(error) =>{
      });
    }
    else{
      this.onChangeColor.emit({color})
    }
  }
  
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
