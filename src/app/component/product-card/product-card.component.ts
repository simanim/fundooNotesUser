import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CardDetailsComponent } from '../card-details/card-details.component';

export interface DialogData {
  noteData:string
}
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  
  constructor( private dialog: MatDialog) { }
  private basic=false;
  private advance=false;

  ngOnInit() {
  }
  
  cardSelect(card): void {
    const dialogRef = this.dialog.open(CardDetailsComponent, {
      width: '600px',
      maxWidth: 'auto',
      data: { noteData : card }
    });
    dialogRef.afterClosed()
    .subscribe(result => {
    });
  }

  

}
