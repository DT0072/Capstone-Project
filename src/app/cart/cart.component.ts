import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CartService } from '../cart.service';
import { AttData } from '../model/att-data';
import { CartData } from '../model/cart-data';
import { DataService } from '../shared/data.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthenticationService } from '../shared/authentication.service';

import { EateriesDashboardComponent } from '../eateries-dashboard/eateries-dashboard.component';
import { AttractionDashboardComponent } from '../attraction-dashboard/attraction-dashboard.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
// items= this.cartService.getItems();
item: CartData[] = [];
items: AttData[] = [];
totalPrice : number = 0;

@Input() childItem: AttData = {
  att_id: '',
  att_name: '',
  att_price: '0',
  att_desc: '',
  att_qty: '',
  att_openHrs: '',
  att_closeHrs: '',
  att_location: '',
  att_image: ''
};

cartdataList: CartData[] = [];
cartdataObj: CartData = {
  cart_id: '',
  cart_user_id: '',
  cart_item_id: '',
  cart_item_name: '',
  cart_item_price: '',
  cart_item_quantity: ''
};
cart_id: string= '';
cart_user_id: string= '';
cart_item_id: string= '';
cart_item_name: string= '';
cart_item_price: string= '';
cart_item_quantity: string= '';

att_name: string = '';
att_desc: string = '';
att_openHrs: string = '';
att_closeHrs: string = '';
att_price: string = '';
att_location: string = '';
att_image: string = '';

  checkoutForm= this.formBuilder.group({name: '', address: ''});
  right: any;

constructor(
  private cartService: CartService,
  private formBuilder: FormBuilder,
  private auth: AuthenticationService, 
  private data: DataService, 
  private afAuth: AngularFireAuth
){}

getItems(): any[] {
  return this.items;
}

emptyCart(): any[] {
  const emptiedCart = this.items;
  this.items = []; // Clear the items array
  return emptiedCart;
}

// handleMinus() {
//   // Perform your logic using the att_qty property
//   this.childItem.att_qty = String(Number(this.childItem.att_qty) - 1);
//   if (Number(this.childItem.att_qty) <= 0) {
//     this.childItem.att_qty = '1';
//   }
//   this.handleMultiply();
// }

handleMinus() {
  if (+this.childItem.att_qty > 1) {
    this.childItem.att_qty = (+this.childItem.att_qty - 1).toString();
    this.handleMultiply();
  }
}

// handlePlus() {
//   // Perform your logic using the att_qty property
//   this.childItem.att_qty = String(Number(this.childItem.att_qty) + 1);
//   if (Number(this.childItem.att_qty) >= 101) {
//     this.childItem.att_qty = '100';
//   }
//   this.handleMultiply();
// }

handlePlus() {
  if (+this.childItem.att_qty < 99) {
    this.childItem.att_qty = (+this.childItem.att_qty + 1).toString();
    this.handleMultiply();
  }
}

handleMultiply() {
  // Perform your logic using the att_qty and att_price properties
  const totalPrice = Number(this.childItem.att_qty) * Number(this.childItem.att_price.replace('RM', ''));
  // Do something with totalPrice
}

// ngOnInit(){
//   this.items.forEach(item => {
//     this.totalPrice += (+item.att_price.replace('RM','')) * item.quantity;
//   })
// }

// onSubmit(): void{
//   //Process checkout data
//   this.items= this.cartService.emptyCart();
//   console.warn('Your order submitted successfully', this.checkoutForm.value);
// }

// Add Attraction
addToCart() {
  if(this.cart_item_name == '' || this.cart_item_price == '' ) {
    alert('Please fill in all fields');
    return;
  }

  this.cartdataObj.cart_id= '';
  this.cartdataObj.cart_user_id= this.cart_user_id;
  this.cartdataObj.cart_item_id= this.cart_item_id;
  this.cartdataObj.cart_item_name= this.cart_item_name;
  this.cartdataObj.cart_item_price= this.cart_item_price;
  this.cartdataObj.cart_item_quantity= this.cart_item_quantity;

  this.data.addToCart(this.cartdataObj);
}

ngOnInit(): void {
  this.getCartItem();
}

// Get All Cart Items
getCartItem() {
  this.data.getCartItem().subscribe(res => {
    this.cartdataList= res.map( (e: any) => {
      const data= e.payload.doc.data();
      data.cart_id= e.payload.doc.id;
      return data;
    })
  }, err => {
    alert('Error while fetching attractions, please try again later');
  })
}
}