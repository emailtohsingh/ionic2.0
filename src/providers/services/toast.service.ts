import { Injectable } from "@angular/core";
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastService {
    toast: any;
    constructor(public toastCtrl: ToastController) {

    }

    showNotification(message: string, duration = 3000, type: String = "error", dismissOnPageChange: boolean = true) {
        this.toast = this.toastCtrl.create({
            message: message,
            duration: duration,
            position: 'top',
            dismissOnPageChange: dismissOnPageChange,
            cssClass: "",
        });
        this.hideNotification()
        this.toast.present();
    }

    hideNotification() {
        if (this.toast) {
            this.toast.onDidDismiss(() => {
                console.log('Dismissed toast');
            });
        }
    }
}
