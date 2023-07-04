import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CartService } from '../cart.service';
import { AttData } from '../model/att-data';
import { CartData } from '../model/cart-data';
import { DataService } from '../shared/data.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthenticationService } from '../shared/authentication.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { EateriesDashboardComponent } from '../eateries-dashboard/eateries-dashboard.component';
import { AttractionDashboardComponent } from '../attraction-dashboard/attraction-dashboard.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnChanges{
  cartdataList: CartData[] = [];
  attdataList: AttData[] = [];
public products : any = [];
// public grandTotal !: number;
grandTotal: number = 0;

constructor(
  private cartService: CartService,
  private formBuilder: FormBuilder,
  private auth: AuthenticationService, 
  private data: DataService, 
  private afAuth: AngularFireAuth,
  private afs: AngularFirestore
){}

ngOnInit(): void{
  // this.cartService.getProduct()
  // .subscribe(res=>{
  //   this.products = res;
  //   this.grandTotal = this.cartService.getTotalPrice();
  // })
  this.getAllAttractions();
  this.getCartItem();
}

ngOnChanges() {
  this.calculateGrandTotal();
}

// removeItem(item: any){
//   this.cartService.removeCartItem(item);
// }

// emptyCart(){
//   this.cartService.removeAllCart();
// }

getAllAttractions() {
    this.data.getAllAttractions().subscribe(res => {
      this.attdataList= res.map( (e: any) => {
        const data= e.payload.doc.data();
        data.att_id= e.payload.doc.id;
        return data;
      })
    }, err => {
      alert('Error while fetching attractions, please try again later');
    })
  }

  getImageUrl(attdata: AttData): string {
    return attdata.att_image;
  }

  //Store to firestore ONLY USE FOR ALL ATTRACTION DISPLAY OUT
  addToCart(attdata: AttData) {
    const cartData: CartData = {
      cart_id: this.afs.createId(),
      cart_user_id: '', // Add the user ID if applicable
      cart_item_id: '',
      cart_item_name: attdata.att_name,
      cart_item_price: attdata.att_price,
      cart_item_quantity: '1', // Set the quantity
      cart_item_image: attdata.att_image,
      cart_item_desc: attdata.att_desc
    };

    this.cartService.addCartItem(cartData)
      .then(() => {
        console.log('Item added to cart successfully');
        this.calculateGrandTotal();
      })
      .catch((error) => {
        console.error('Error adding item to cart', error);
      });
  }

  //Fetch from firestore
  getCartItem() {
    this.cartService.addToCart().subscribe(res => {
      this.cartdataList= res.map( (e: any) => {
        const data= e.payload.doc.data();
        data.att_id= e.payload.doc.id;
        return data;
      })
    }, err => {
      alert('Error while fetching attractions, please try again later');
    })
  }

  //Get Cart Image
  getCartImageUrl(cartdata: CartData): string {
    return cartdata.cart_item_image;
  }

  // Delete Cart Item
  // deleteCartItem(cartdata: CartData) {
  //   if(window.confirm('Are you sure you want to delete ' + cartdata.cart_item_name + '?')){
  //     this.cartService.deleteCartItem(cartdata);
  //   }
  // }

  // deleteCartItem(cartdata: CartData) {
  //   const cartItemId = cartdata.cart_id;
    
  //   // Remove the item from the cartdataList array
  //   const itemIndex = this.cartdataList.findIndex(item => item.cart_id === cartItemId);
  //   if (itemIndex !== -1) {
  //     this.cartdataList.splice(itemIndex, 1);
  //   }
    
  //   // Delete the item from the Firestore collection
  //   this.afs.collection('/cartdatas').doc(cartItemId).delete()
  //     .then(() => {
  //       console.log('Item deleted successfully');
  //     })
  //     .catch((error) => {
  //       console.error('Error deleting item', error);
  //     });
  // }

  deleteCartItem(cartdata: CartData) {
    const cartItemId = cartdata.cart_item_id;
    
    // Remove the item from the cartdataList array
    const itemIndex = this.cartdataList.findIndex(item => item.cart_item_id === cartItemId);
    if (itemIndex !== -1) {
      this.cartdataList.splice(itemIndex, 1);
    }
    
    // Delete the item from the Firestore collection
    this.afs.collection('/cartdatas').doc(cartItemId).delete()
      .then(() => {
        console.log('Item deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting item', error);
      });
  }
  
  convertToNumber(value: string): number {
    return Number(value);
  }

  //For All Attraction
  // calculateGrandTotal() {
  //   this.grandTotal = 0;
  //   for (const attdata of this.attdataList) {
  //     if (attdata.selected) {
  //       const totalPrice = this.convertToNumber(attdata.att_price) * this.convertToNumber(attdata.att_qty);
  //       this.grandTotal += totalPrice;
  //     }
  //   }
  // }

  //For Cart In Firestore
  calculateGrandTotal() {
    this.grandTotal = 0;
    for (const cartdata of this.cartdataList) {
      if (cartdata.selected) {
        const totalPrice = this.convertToNumber(cartdata.cart_item_price) * this.convertToNumber(cartdata.cart_item_quantity);
        this.grandTotal += totalPrice;
      }
    }
  }
  


}