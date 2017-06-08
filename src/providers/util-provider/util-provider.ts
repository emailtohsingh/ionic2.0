import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController } from 'ionic-angular';
@Injectable()
export class UtilProvider {

  constructor(private loadingCrtl: LoadingController, private alertCtrl: AlertController, private toastCtrl: ToastController) {
  }

  doAlert(title, message, buttonText) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [buttonText]
    });
    return alert;
  }


  presentLoading(content) {
    let loading = this.loadingCrtl.create({
      dismissOnPageChange: true,
      content: content
    });
    return loading;
  }

  getToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    return toast;
  }

  showNotification(message: string, duration = 3000, type: String = "error", dismissOnPageChange: boolean = true) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'top',
      dismissOnPageChange: dismissOnPageChange,
      cssClass: "",
    });
    toast.present();
  }
}

