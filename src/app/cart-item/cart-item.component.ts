import { Component, Input } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DataService } from '../shared/data.service';
import { AttData } from '../model/att-data';
import { CartData } from '../model/cart-data';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  @Input() cartdata: any;
  cartdataList: CartData[] = [];
  attdataList: AttData[] = [];

  constructor(private auth: AuthenticationService, private data: DataService, private afAuth: AngularFireAuth) {}

  handleMinus() {
    this.cartdata.cart_item_quantity = String(Number(this.cartdata.cart_item_quantity) - 1);
    if (Number(this.cartdata.cart_item_quantity) <= 0) {
      this.cartdata.cart_item_quantity = '1';
    }
    this.handleMultiply();
  }

  handlePlus() {
    this.cartdata.cart_item_quantity = String(Number(this.cartdata.cart_item_quantity) + 1);
    if (Number(this.cartdata.cart_item_quantity) >= 101) {
      this.cartdata.cart_item_quantity = '100';
    }
    this.handleMultiply();
  }

  handleMultiply() {
    const totalPrice = Number(this.cartdata.cart_item_quantity) * Number(this.cartdata.cart_item_price.replace('RM', ''));
    // Do something with totalPrice
  }

  ngOnInit(): void {
    this.getCartItem();
  }

  // Get All Cart Items
  getCartItem() {
    this.data.getCartItem().subscribe(res => {
      this.cartdataList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.cart_id = e.payload.doc.id;
        return data;
      })
    }, err => {
      alert('Error while fetching attractions, please try again later');
    })
  }

  

  calculateTotalPrice(): number {
    const quantity = Number(this.cartdata.cart_item_quantity);
    const price = Number(this.cartdata.cart_item_price.replace('RM', ''));
    return quantity * price;
  }
}
