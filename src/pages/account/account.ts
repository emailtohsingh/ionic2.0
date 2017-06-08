import { Component } from '@angular/core';

import { AlertController, NavController } from 'ionic-angular';

import { AuthService } from '../../providers/auth-provider/auth-service';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {
  username: string;

  constructor(public alertCtrl: AlertController, public nav: NavController, public auth: AuthService) {

  }

  ngAfterViewInit() {
    this.getUsername();
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  changeUsername() {
    let alert = this.alertCtrl.create({
      title: 'Change Username',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'username',
      value: this.username,
      placeholder: 'username'
    });
    alert.addButton({
      text: 'Ok',
      handler: data => {
        this.auth.setUsername(data.username);
        this.getUsername();
      }
    });

    alert.present();
  }

  getUsername() {
    this.auth.getUsername().then((username) => {
      this.username = username;
    });
  }

  changePassword() {
    let alert = this.alertCtrl.create({
      title: 'Change Password',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'New Password',
      value: '',
      placeholder: 'Enter Password'
    });
    alert.addInput({
      name: 'Confirm Password',
      value: '',
      placeholder: 'Confirm Password'
    });
    alert.addButton({
      text: 'Ok',
      handler: data => {
        this.auth.setUsername('Himanshu');
        this.getUsername();
      }
    });

    alert.present();
  }

}
