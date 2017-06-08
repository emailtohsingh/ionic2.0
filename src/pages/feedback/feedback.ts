import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html'
})
export class FeedbackPage {

  character;

  constructor(
    public viewCtrl: ViewController) {
    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}