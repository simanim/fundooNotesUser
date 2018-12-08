import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user/user.service';
import { LoggerService } from '../../core/services/logger/logger.service';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private shoppingCartService : UserService, private snackBar : MatSnackBar) { }

  private cartId=localStorage.getItem("productCartId");
  private cartItem;
  private product:object={};
  private address='';
  private status='';
  private item=[];
  private shoppingCart=true;
  private review=false;
  private placed=false;
  private loader=true;
  ngOnInit() {
    this.getMyCart();
  }
  proceed(){
    this.shoppingCart=false;
    this.review=true;
    this.placed=false;    
  }

 /**
  * 
  * @description getting product details
  */

 /**
  * 
  * @description getting cart list of user
  */
  getMyCart(){
    this.shoppingCartService.getmyCart()
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) => {
      LoggerService.log("res",response)
      if(response['data'].length!=0){
        this.cartItem=response['data'][0];
        this.product=this.cartItem['product'];
      }
      else{
        this.cartItem=[]
      }
      this.loader=false;
      // if(response['data'].length == 0){
      //   this.cartItem=[];
      //   // this.getCardDetails();
      // }
      // else{
      //   this.shoppingCart=false;
      //   this.review=false;
      //   this.placed=true; 
      //   this.cartItem=response['data'][0];
      //   this.product=this.cartItem['product'];
      //   this.status=response['data'][0].status;
      //   LoggerService.log("product",this.cartItem)
      //   localStorage.removeItem("productCartId");
      // }
    },(error)=>{
    });
  }

 /**
  * 
  * @description order place
  */
  place(){
   /**
    * 
    * @description the user cant place order without address
    */
    if(this.address==''){
      this.snackBar.open("failed","please enter address", {
        duration: 2000,
      });
      return;
    }
    let body={
      "cartId":this.cartId,
      "address":this.address
    }
    this.shoppingCartService.placeOrder(body)
    .pipe(takeUntil(this.destroy$))
    .subscribe((response) => {
      this.shoppingCart=false;
      this.review=false;
      this.placed=true;    
    },(error)=>{
    });
  }

 /**
  * 
  * @description unsubscribing
  */
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
