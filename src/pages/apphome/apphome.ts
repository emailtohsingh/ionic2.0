import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { MapPage } from '../map/map';

@Component({
  selector: 'page-apphome',
  templateUrl: 'apphome.html'
})
export class ApphomePage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };

  constructor(private nav: NavController, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
    this.showLoading();
  }

  public createAccount() {
    this.nav.push(LoginPage);
  }

  public loginPage() {
    this.nav.push(LoginPage);
  }
  public skipLogin() {
    this.nav.push(MapPage);
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
    setTimeout(() => {
      this.loading.dismiss();
    }, 500);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApphomePage');
  }

}
