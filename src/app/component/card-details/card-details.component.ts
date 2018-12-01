import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {

  isLinear = false;

  constructor( private dialogRef : MatDialogRef<ProductCardComponent>) {}

  ngOnInit() {
    
  }

  remove(){
    this.dialogRef.close();

  }
}
