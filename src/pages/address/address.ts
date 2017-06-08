import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-address',
  templateUrl: 'address.html'
})
export class AddressPage {
  aboutusContent:string = ""
  shippingAddr:any = [];
  constructor(
    public viewCtrl: ViewController, public navParams:NavParams) {
      this.shippingAddr = this.navParams.get("address");
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}