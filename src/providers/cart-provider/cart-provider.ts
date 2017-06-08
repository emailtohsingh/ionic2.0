import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { StorageProvider } from '../storage-provider/storage-provider';
import { UtilProvider } from '../util-provider/util-provider';
import { REST_WEB_SERVICE_URL } from '../../utils/content.utils';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
@Injectable()
export class CartProvider {

  cartID: string;
  cartURL = REST_WEB_SERVICE_URL + "?route=rest/cart"
  cart: any = [];

  constructor(public storage: StorageProvider, public http: Http, private utilProvider: UtilProvider) {
    let local_cart_id = this.storage.get('cart_id');
    if (local_cart_id) {
      this.cartID = local_cart_id;
    }
  }

  setCartID(value) {
    console.log('set cart id', value);
    this.cartID = value;
    if (value) {
      this.storage.set('cart_id', value);
    } else {
      this.storage.remove('cart_id');
    }
  }

  intializePayments() {
  }

  addToCart(cartItem) {
    let itemAdded: boolean = false;
    let message: string = cartItem.name;
    this.cart = this.storage.getObject("cart");
    if (this.cart == null) {
      this.cart = [];
    }
    if (this.cart.length > 0) {
      for (let index = 0; index < this.cart.length; index++) {
        if (this.cart[index].id == cartItem.id) {
          this.cart[index].quantity = this.cart[index].quantity + 1;
          itemAdded = true;
          message = message + " updated to cart."
          break;
        }
      }
    }
    if (!itemAdded) {
      message = message + " added to cart."
      this.cart.push(cartItem);
    }
    this.utilProvider.showNotification(message, 2000);
    this.storage.setObject("cart", this.cart);
  }

  isCartExist() {
    if (this.cartID) {
      console.log(this.cartID);
      return true;
    } else {
      return false
    };
  }

  getCartContents() {
    return this.http.get(this.cartURL)
      .map(res => res.json())
      .catch(this.handleError);
  }

  updateCart(items) {
    items = items.map((item) => {
      return { product_id: item.product_id, quantity: item.quantity };
    });
  }

  removeItem(item_id) {

  }

  createOrder(items, address) {
    
  }

  getPayment(amount, user) {
    

  }
  createPayment(order_id, nonce) {

  }

  handleError(error) {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
