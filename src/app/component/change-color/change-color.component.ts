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
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-change-color',
  templateUrl: './change-color.component.html',
  styleUrls: ['./change-color.component.css']
})
export class ChangeColorComponent implements OnInit {
  @Input() card;
  @Output() onChangeColor= new EventEmitter()
  constructor(private changeColorService : HttpService) { }
  public token=localStorage.getItem("fundooUserToken");

  ngOnInit() {
  }
  /**
  * 
  * @description changing the color of particular note
  */
  colorChange(color){
    if(this.card){
      var id=[];
      id.push(this.card.id);

      this.changeColorService.postDataMore("/notes/changesColorNotes", 
      {
        "color":color,
        "noteIdList":id
      },this.token)
      .subscribe((response) =>{
      this.onChangeColor.emit(color)
      },(error) =>{
      });
    }
    else{
      this.onChangeColor.emit({color})
    }
  }

}
