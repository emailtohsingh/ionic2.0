import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../providers/category-provider/category';
import { StorageProvider } from '../..//providers/storage-provider/storage-provider';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import 'rxjs/add/operator/map';

import { ProductsByCategoryPage } from '../../pages/products/product.category';
import { CartPage } from '../cart/cart';

import { Toast } from 'ionic-native'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {
  private loading: Loading;

  searchQuery: string = '';
  public items: any;

  public productItems: any

  start: number = 0;

  public catList: any;
  public cartSize: number;

  constructor(private navCtrl: NavController, private loadingCtrl: LoadingController, private catservice: CategoryService, private storage: StorageProvider) {
    //this.productItems = [];
    this.catList = [];
  }

  ngOnInit() {
    this.loadRootLevelCategories();
  }

  ionViewDidEnter() {
    if (this.storage.getObject("cart") != null) {
      this.cartSize = this.storage.getObject("cart").length;
    }
  }

  ionViewDidLeave() {
    //this.productItems = [];
  }
  loadRootLevelCategories(start: number = 0) {
    if (!this.productItems || this.productItems.length < 1) {
      this.loading = this.loadingCtrl.create({ content: 'Please wait...' });
      this.loading.present();
      this.catservice.getCategory().then(result => {
        this.loading.dismiss();
        if (result.status == 1 && result.data) {
          for (let item of result.data) {
            let categoryItems = {
              name: item.name,
              showDetails: false,
              icon: 'arrow-down',
              picture: item.picture,
              description: item.description,
              children: item.children
            }
            this.catList.push(categoryItems);
          }
        }
        Toast.show("Product Loaded", "1500", "top");
      })
    }
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
      $this.loadRootLevelCategories();
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  toggleDetails(data) {
    if (data.showDetails) {
      data.showDetails = false;
      data.icon = 'arrow-down';
    } else {
      data.showDetails = true;
      data.icon = 'arrow-up';
    }
  }

  isGroupShown(data) {
    return data.showDetails;
  };

  doRefresh(refresher) {
    let $this = this;
    this.catList = [];
    setTimeout(() => {
      console.log('Async operation has ended');
      $this.start = 0
      $this.loadRootLevelCategories();
      refresher.complete();
    }, 2000);
  }

  loadProducts(id, name) {
    this.navCtrl.push(ProductsByCategoryPage, {
      categoryId: id,
      categoryName: name
    });

  }

  openCart() {
    this.navCtrl.push(CartPage);
  }
}