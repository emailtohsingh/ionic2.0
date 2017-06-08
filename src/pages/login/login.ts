import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading, MenuController, ViewController, Events } from 'ionic-angular';
import { AuthService } from '../../providers/auth-provider/auth-service';
import { TabsPage } from '../tabs/tabs';
import { ChekoutPage } from '../checkout/checkout';
import { IDetailedError } from '@ionic/cloud';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '', fName: '', lName: '' };
  round: boolean;
  expand: boolean;
  segment: string;
  showSpinner: boolean;
  spinnerColor: string;

  constructor(private nav: NavController,
    private navParams: NavParams,
    private auth: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private menuCtrl: MenuController,
    private viewCtrl: ViewController, private events: Events) {
    this.segment = "signIn";
    this.showSpinner = false;
    this.spinnerColor = 'light';
    this.menuCtrl.swipeEnable(false);

  }

  public logout() {
    this.auth.logout();
    this.events.publish('user:logout');

  }

  public login(provider: string, segment: string) {
    this.showSpinner = true;
    //this.showLoading()
    if (provider == '' && segment == "signIn") {
      this.auth.login(this.registerCredentials).subscribe(allowed => {
        if (allowed) {
          setTimeout(() => {
            this.round = true;
            this.expand = true;
            this.showSpinner = false;
            this.events.publish('user:login', '');
            if (this.navParams.get("route") == "cart") {
              this.nav.push(ChekoutPage);
            } else {
              this.nav.setRoot(TabsPage);
            }
          });
        } else {
          this.round = false;
          this.showSpinner = false;
          this.showError("Access Denied");
        }
      },
        error => {
          this.round = false;
          this.showSpinner = false;
          this.showError(error);
        });
    }

    if (provider && provider.length > 0 && (this.auth.getUserInfo() == null || this.auth.getUserInfo().name == null)) {
      this.auth.azureLogin(provider);
      this.nav.push(TabsPage);

    } else {
      //this.nav.push(TabsPage.);
    }

  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text) {
    setTimeout(() => {
      this.round = false;
    });

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  setClass() {
    let classes = {
      round: this.round,
      expand: this.expand
    };
    return classes;
  }
  isInvalid() {
    if (this.segment == 'signIn') {
      if (this.registerCredentials.email == null || this.registerCredentials.email.length < 1 || this.registerCredentials.password == null || this.registerCredentials.password.length < 1) {
        return true;
      } else {
        return false;
      }
    } else {
      if (this.registerCredentials.email == null || this.registerCredentials.email.length < 1 || this.registerCredentials.password == null || this.registerCredentials.password.length < 1 || this.registerCredentials.fName == null || this.registerCredentials.fName.length < 1 || this.registerCredentials.lName == null || this.registerCredentials.lName.length < 1) {
        return true;
      } else {
        return false;
      }
    }
  }

  signUpError(err: IDetailedError<string[]>) {
    for (let e of err.details) {
      console.log("e ", e);
      if (e === 'conflict_email') {
        let alert = this.alertCtrl.create({
          title: 'Sorry',
          subTitle: 'A user with this email already exists',
          buttons: ['OK']
        });
        alert.present();
      }
      else if (e === 'invalid_email') {
        let alert = this.alertCtrl.create({
          title: 'Sorry',
          subTitle: 'This is not a valid email address',
          buttons: ['OK']
        });
        alert.present();
      }
    }
    this.showSpinner = false;
    this.round = false;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}