import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CardDetailsComponent } from '../card-details/card-details.component';
import { LoggerService } from '../../core/services/logger/logger.service';
import { UserService } from '../../core/services/user/user.service';
import { Router } from '@angular/router';

export interface DialogData {
  noteData:object
}
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  
  constructor( private router : Router,private dialog: MatDialog, private productCardService : UserService) { }
  private basic=false;
  private advance=false;
  private card=[]
  private cartId='';
  private loader:boolean=true;
  private id= localStorage.getItem("fundooUserToken");

  ngOnInit() {
    if(this.id != null){
      this.router.navigateByUrl('/home');
    }
    this.getService();
    localStorage.removeItem("productCartId");

  }
  
  getService(){
    this.card=[];
    this.productCardService.getService()
    .subscribe((response) => {
      
      for(let i=0;i<response["data"].data.length;i++)
      {
        response["data"].data[i].select=false;
        this.card.push(response["data"].data[i]);
        this.loader=false
      }
    },(error) =>{
    });
  }

  cardSelect(product){
    let body={"productId":product.id}
    this.productCardService.addToCart(body)
    .subscribe((response) => {
      localStorage.setItem("productCartId",response['data'].details.id)
      this.proceed(product);
    },(error) =>{
    });
  }
  proceed(product): void {
    const dialogRef = this.dialog.open(CardDetailsComponent, {
      width: '600px',
      maxWidth: 'auto',
      data: { noteData : product }
    });
    dialogRef.afterClosed()
    .subscribe(result => {
    });
  }

  signin(){
    this.router.navigateByUrl('/login');
  }

}
