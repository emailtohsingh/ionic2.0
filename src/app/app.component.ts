import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController, Events, MenuController, PopoverController } from 'ionic-angular';
import { StatusBar, Splashscreen, SMS, Network} from 'ionic-native';
import { ApphomePage } from '../pages/apphome/apphome';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { AccountPage } from '../pages/account/account';
import { CartPage } from '../pages/cart/cart';
import { SharePage } from '../pages/share/share';
import { RateusPage } from '../pages/rateus/rateus';
import { AboutusPage } from '../pages/aboutus/aboutus';

import { StorageService } from '../providers/services/storage.service';
import { AuthService } from '../providers/auth-provider/auth-service';

interface PageObj {
  title: string;
  component: any;
  icon: string;
  index?: number;
}

@Component({
  templateUrl: 'app.html',
})


export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: any = null;

  pages: any = [];
  activePage: any;
  isHome: boolean = false;
  session: any = [];
  username: string;


  loggedInPages: PageObj[] = [
    { title: 'My Address', component: AccountPage, icon: 'pin' },
    { title: 'My Orders', component: TabsPage, icon: 'create' },
    { title: 'My Cart', component: CartPage, icon: 'cart' },
    { title: 'RMLive Wallet', component: TabsPage, icon: 'logo-bitcoin' },
    { title: 'Offer Zone', component: TabsPage, icon: 'log-out' },
    { title: 'Logout', component: TabsPage, icon: 'log-out' }

  ];
  loggedOutPages: PageObj[] = [
    { title: 'Login', component: LoginPage, icon: 'log-in' },
    { title: 'My Address', component: TabsPage, icon: 'pin' },
    { title: 'My Orders', component: TabsPage, icon: 'create' },
    { title: 'My Cart', component: CartPage, icon: 'cart' },
    { title: 'RMLive Wallet', component: TabsPage, icon: 'logo-bitcoin' },
    { title: 'Offer Zone', component: TabsPage, icon: 'log-out' },

  ];

  appPages: PageObj[] = [
    { title: 'Contact us', component: TabsPage, icon: 'contacts' },
    { title: 'Rate Us', component: '', index: 2, icon: 'star' },
    { title: 'Share', component: '', index: 3, icon: 'share-alt' },
    { title: 'About Us', component: '', index: 3, icon: 'information-circle' },
    { title: 'SMS', component: '', icon: 'share-alt' }
  ];

  constructor(public platform: Platform,
    public storageService: StorageService,
    public auth: AuthService, private modalCtrl: ModalController, private events: Events, public menu: MenuController, public popoverCtrl: PopoverController) {
    this.initializeApp();
    this.listenToLoginEvents();
  }

  ngAfterViewInit() {
    this.getUsername();
  }

  getUsername() {
    this.auth.getUsername().then((username) => {
      this.username = username;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      setTimeout(function () {
        Splashscreen.hide();
      }, 500);
      this.initializeDatabase();
      let connectSubscription = Network.onConnect().subscribe(() => {
        console.log('network connected!');
        // We just got a connection but we need to wait briefly
        // before we determine the connection type.  Might need to wait?
        // prior to doing any api requests as well.
        setTimeout(() => {
          if (Network.type === 'wifi') {
            console.log('we got a wifi connection, woohoo!');
          }
        }, 3000);
      });      
    });
  }

  initializeDatabase() {
    let $this = this;
    this.storageService.getLocation().then(data => {
      $this.session = data;
      if ($this.session && this.session.length > 0) {
        $this.auth.hasLoggedIn().then(data => {
          if (data) {
            $this.auth.loggedIn = true;
            $this.events.publish('user:login')
            $this.rootPage = TabsPage;
          } else {
            $this.auth.loggedIn = false;
            $this.rootPage = TabsPage;
          }
        });
      } else {
        $this.rootPage = ApphomePage;
      }
    });

  }

  openPage(page: PageObj) {

    if (page.title === 'Rate Us') {
      //this.rateUs();
      let popover = this.popoverCtrl.create(RateusPage);
      popover.present();
    }

    if (page.title === 'Share') {
      let popover = this.popoverCtrl.create(SharePage);
      popover.present();
    }

    if (page.title === 'About Us') {
      let modalAbout = this.modalCtrl.create(AboutusPage);
      modalAbout.present();
    }

    if (page.index && page.component != '') {
      this.nav.push(page.component, { tabIndex: page.index });

    } else {
      if (page.component != '') {
        this.nav.push(page.component);
      }
    }

    if (page.title === 'SMS') {
      setTimeout(() => {
        SMS.send('8968991196', 'Hello world!');
      }, 1000);
    }

    if (page.title === 'Logout') {
      setTimeout(() => {
        this.auth.logout();
        this.username = "Guest";
        this.events.publish("user:logout");
      }, 1000);
    }

  }

  openHome() {
    this.nav.setRoot(ApphomePage);
    this.isHome = false;
  }

  checkForActivePage(page) {
    return page == this.activePage;
  }

  logoutUser() {
    this.auth.logout();
    this.username = "Guest";
  }

  loginUser() {
    let contactModal = this.modalCtrl.create(LoginPage);
    contactModal.present();
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
      this.getUsername();
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn) {
    this.menu.enable(this.auth.loggedIn, 'loggedInMenu');
    this.menu.enable(!this.auth.loggedIn, 'loggedOutMenu');
  }

    /*
  constructSideMenuItems() {
    this.category.getCategory().then(result => {
      for (let category of result) {
        this.pages.push({
          title: category.name,
          id: category.id
        })
      }
    })
  }
  */

}
