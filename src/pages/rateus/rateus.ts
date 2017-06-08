import { Component } from '@angular/core';
import { ModalController, ViewController } from 'ionic-angular';
import { AppRate} from 'ionic-native';
import { FeedbackPage } from '../feedback/feedback';

@Component({
  selector: 'page-rateus',
  templateUrl: 'rateus.html',

})
export class RateusPage {
  flipped: boolean = false;
  constructor(private modalCtrl: ModalController,public viewCtrl: ViewController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RateusPage');
  }

  public callMeh() {
    let modal = this.modalCtrl.create(FeedbackPage);
    modal.present();
  }

  public callLovedIt() {
    AppRate.preferences = {
      openStoreInApp: true,
      displayAppName: 'RMLive',
      usesUntilPrompt: 5,
      promptAgainForEachNewVersion: true,
      storeAppURL: {
        android: 'market://details?id=com.ionicframework.techomaticapp711695',
      },
      customLocale: {
        title: "Rate Us",
        message: "Thanks for liking the RMLive, please take a momemnt to share the feedback in app store!",
        rateButtonLabel: "Rate it!",
        cancelButtonLabel: "No, Thanks",
        laterButtonLabel: "Ask Later",
      }
    };

    AppRate.promptForRating(true);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
