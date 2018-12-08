import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductCardComponent ,DialogData } from '../product-card/product-card.component';
import { Router } from '@angular/router';
import { DataService } from '../../core/services/data/data.service';
@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {

  isLinear = false;

  constructor( private dialogRef : MatDialogRef<ProductCardComponent>, private router : Router,
    @Inject(MAT_DIALOG_DATA) private data : DialogData,private dataService : DataService) {}

  ngOnInit() {
  }

  remove(){
    this.dialogRef.close();

  }
  checkout(){
    this.dialogRef.close();
    this.router.navigateByUrl('/signup');
  }
}
