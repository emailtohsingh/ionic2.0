import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { CartProvider } from '../../providers/cart-provider/cart-provider';
import { StorageProvider } from '../../providers/storage-provider/storage-provider';
import { UtilProvider } from '../../providers/util-provider/util-provider';
import { AuthService } from '../../providers/auth-provider/auth-service';
import { ProductDetailPage } from '../products/product.details';
import { TabsPage } from '../tabs/tabs';
import { ChekoutPage } from '../checkout/checkout';
import { LoginPage } from './../login/login';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  cart: any;
  isExist: Boolean;
  items: any = [];
  total: number = null;
  images: any = []
  public cartSize: number;
  constructor(public cartProvider: CartProvider,
    public nav: NavController,
    public storage: StorageProvider,
    public authService: AuthService,
    public util: UtilProvider, private events: Events) {
  }

  ionViewWillEnter() {
    if (this.storage.getObject("cart") && this.storage.getObject("cart").length > 0) {
      this.items = this.storage.getObject("cart");
      this.cartSize = this.storage.getObject("cart").length;
      this.getTotal(this.items);
    } else {
      //this.populateDummyData();
      //this.getTotal(this.items);
    }
  }

  changeQuantity(index, quantity) {
    this.items[index].quantity = quantity;
    this.getTotal(this.items);
    this.storage.setObject("cart", this.items);
  }

  removeItem(id) {
    for (let index = 0; index < this.items.length; index++) {
      if (this.items[index].id == id) {
        this.items.pop(this.items[index]);
        this.getTotal(this.items)
        this.storage.setObject("cart", this.items);
      }
    }
  }


  checkout() {
    if (this.authService.loggedIn) {
      this.nav.push(ChekoutPage, { items: this.items });
    } else {
      this.nav.push(LoginPage, { route: "cart" });
    }
  }

  getTotal(items?) {
    if (items && items.length > 0) {
      let total = items.map((x) => {
        return x.price_discount * x.quantity;
      }).reduce((pre, curr) => {
        return pre + curr;
      });
      this.total = total;

    } else {
      this.total = 0;
    }
  }

  reset() {
    this.cart = null;
    this.items = null;
    this.total = null;
    this.storage.remove("cart");
  }

  populateDummyData() {
    for (let i = 1; i < 4; i++) {
      let product = {
        id: i,
        images: this.images,
        description: "test",
        quantity: i * 3,
        price: 20,
        price_discount: i * 7,
      }
      this.items.push(product)
      this.storage.setObject("cart", this.items);
    }
  }

  add(index, quantity) {
    if (this.items[index].quantity == 15) {
      this.items[index].quantity = 15;
    } else {
      this.items[index].quantity = quantity + 1;
    }
    this.getTotal(this.items);
    this.storage.setObject("cart", this.items);
  }
  remove(index, quantity) {
    if (this.items[index].quantity == 1) {
      this.items[index].quantity = 1;
    } else {
      this.items[index].quantity = quantity - 1;
    }
    this.getTotal(this.items);
    this.storage.setObject("cart", this.items);
  }
  viewProduct(product) {
    this.nav.push(ProductDetailPage, { product: product })
  }
  setHome() {
    this.nav.setRoot(TabsPage);
  }
}