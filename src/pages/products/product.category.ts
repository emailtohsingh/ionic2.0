import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../providers/product-provider/ProductService';
import { ModalController, LoadingController, Loading, NavController, NavParams } from 'ionic-angular';
import { CONTENT_ITEMS_PER_PAGE, REST_WEB_SERVICE_URL } from '../../utils/content.utils';
import { CartProvider } from '../../providers/cart-provider/cart-provider';
import { ProductDetailPage } from '../products/product.details'
import { StorageProvider } from '../..//providers/storage-provider/storage-provider';

import { CartPage } from '../cart/cart';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-products',
  templateUrl: 'product.category.html',
  providers: [ProductService]
})
export class ProductsByCategoryPage implements OnInit {
  private loading: Loading;

  searchQuery: string = '';
  public items: any;
  public categoryId: any;

  public productItems: any
  public quantity: any;
  images: any = []

  start: number = 0;
  cartSize: number = 0;
  noOfProduct: number = 0;
  categoryName: string = "";

  constructor(private modalCtrl: ModalController,
    private navController: NavController,
    private navParams: NavParams,
    private productsProvider: ProductService,
    private loadingCtrl: LoadingController,
    private cartProvider: CartProvider,
    private storage: StorageProvider) {
    this.productItems = [];
    this.categoryId = this.navParams.get('categoryId');
    this.categoryName = this.navParams.get('categoryName');
  }

  ngOnInit() {
    this.loadData('', this.start);

  }

  ionViewDidEnter() {
    this.getCartSize()
  }

  ionViewDidLeave() {
    //this.productItems = [];
  }

  loadData(direction: string = '', start: number = 0): any {
    let params: string = "&startIndex=" + this.start + "&perPage=" + CONTENT_ITEMS_PER_PAGE + "&categoryId=" + this.categoryId;

    let url = REST_WEB_SERVICE_URL + "route=rest/products&method=getProductsByCatId" + params;

    // show loading
    this.loading = this.loadingCtrl.create({ content: 'Please wait...' });
    this.loading.present();

    // fetch content
    return this.productsProvider.getContent(url, params).subscribe(data => {
      // hide loading

      this.loading.dismiss();

      if (data.status == 1 && data.data) {
        for (let item of data.data) {
          let images = item.picture.split(',');
          this.images = [];
          for (let image of images) {
            this.images.push("assets/apps/" + image)
          }

          let product = {
            id: item.productId,
            name: item.name,
            picture: this.images,
            price: item.price,
            description: item.description,
            inStock: item.in_stock,
            mrp: item.mrp
          }
          this.productItems.push(product);
        }
        this.initializeSearchItems();
        this.noOfProduct = this.productItems.length;
        return this.productItems;
      } else {
        return this.productItems;
      }
    },
      err => {
        console.log("Oops!");
      });
  }

  viewProduct() {

  }
  initializeSearchItems() {
    this.items = this.productItems;
  }


  getItems(ev: any) {
    let val = ev.target.value;
    this.initializeSearchItems();
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


  doInfinite(infiniteScroll) {
    let $this = this;
    console.log('doInfinite, start is currently ' + $this.start);
    setTimeout(() => {
      $this.start += 50;
      $this.loadData();
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 2000);
  }

  doRefresh(refresher) {
    let $this = this;
    this.productItems = [];
    setTimeout(() => {
      console.log('Async operation has ended');
      $this.start = 0
      $this.loadData();
      refresher.complete();
    }, 2000);
  }


  addToCart(product, quantity) {

    let cartItem: any = {
      id: product.id,
      name: product.name,
      description: product.description,
      images: product.picture,
      price: product.mrp,
      price_discount: product.price,
      quantity: quantity,
    }
    this.cartProvider.addToCart(cartItem);
    this.getCartSize();
  }

  clickedProduct(product) {
    this.navController.push(ProductDetailPage, { product: product });
  }

  openCart() {
    this.navController.setRoot(CartPage);
  }

  private getCartSize() {
    if (this.storage.getObject("cart") != null) {
      this.cartSize = this.storage.getObject("cart").length;
    }
  }

}