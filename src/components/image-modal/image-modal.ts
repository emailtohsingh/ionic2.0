import {Component} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'image-modal.html',
})
export class ImageModal {
  images:any;
  sliderOptions
  constructor(public viewCtrl: ViewController, public params: NavParams) {
   this.images = this.params.get('images');
   this.sliderOptions = {
      pager: true
    };
  }
  
  close() {
    console.log("Closing Modal");
    this.viewCtrl.dismiss();
  }
}
