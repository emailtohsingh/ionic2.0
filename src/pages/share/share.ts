import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { SocialSharing } from 'ionic-native';

@Component({
    selector: 'page-share',
    templateUrl: 'share.html',

})
export class SharePage {
    flipped: boolean = false;
    constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, public viewCtrl: ViewController) { }

    ionViewDidLoad() {

    }

    shareViaEmail() {
        let canShare: boolean = false;
        SocialSharing.canShareViaEmail().then(() => {
            canShare = true;
        }).catch(() => {
            canShare = false;
        });

        if (canShare) {
            let email: any = [];
            email.push('himanshu.kashyap@gmail.com')
            SocialSharing.shareViaEmail('Test RM Live', 'RMLive', email).then(() => {
                console.log("Email Sent")
            }).catch(() => {

            });
        }
    }

    shareViaWhatsApp() {
        let canShare: boolean = false;
        SocialSharing.canShareVia('whatsapp').then(() => {
            canShare = true;
        }).catch(() => {
            canShare = false;
        });

        if (canShare) {
            let email: any = [];
            email.push('himanshu.kashyap@gmail.com')
            SocialSharing.shareViaWhatsApp('Test RM Live', 'RMLive', email).then(() => {
                console.log("Email Sent")
            }).catch(() => {

            });
        }
    }

    shareViaFacebook() {
        let canShare: boolean = false;
        SocialSharing.canShareVia('facebook').then(() => {
            canShare = true;
        }).catch(() => {
            canShare = false;
        });

        if (canShare) {
            let email: any = [];
            email.push('himanshu.kashyap@gmail.com')
            SocialSharing.shareViaFacebook('Test RM Live', 'RMLive', email).then(() => {
                console.log("Email Sent")
            }).catch(() => {

            });
        }
    }

    shareViaTwitter() {
        let canShare: boolean = false;
        SocialSharing.canShareVia('twitter').then(() => {
            canShare = true;
        }).catch(() => {
            canShare = false;
        });

        if (canShare) {
            let email: any = [];
            email.push('himanshu.kashyap@gmail.com')
            SocialSharing.shareViaEmail('Test RM Live', 'RMLive', email).then(() => {
                console.log("Email Sent")
            }).catch(() => {

            });
        }
    }

    regularShare() {
        SocialSharing.share("Testing, sharing this from inside an app I'm building right now", null, "http://rationmahal.com/shop", null);
    }
    dismiss() {
        this.viewCtrl.dismiss();
    }

}
