import { Component } from '@angular/core';
import { NavController, Events, ModalController } from 'ionic-angular';
import { CartProvider } from '../../providers/cart-provider/cart-provider';
import { StorageProvider } from '../../providers/storage-provider/storage-provider';
import { AddressPage } from '../address/address';

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class ChekoutPage {
  shippingAddr: any = [];




  constructor(public cartProvider: CartProvider,
    public nav: NavController,
    public storage: StorageProvider,
    private events: Events, public modalCtrl: ModalController) {
  }

  ionViewWillEnter() {
    this.shippingAddr = [];
    let address = {
      house: '452 (Top Floor)',
      locality: 'Sector 12',
      city: 'Panchkula',
      state: 'Haryana',
      country: 'India',
      zipcode: '134109'
    }
    this.shippingAddr.push(address);

  }

  editAddress(address) {
    let modalAbout = this.modalCtrl.create(AddressPage, { address: address });
    modalAbout.present();
  }
}