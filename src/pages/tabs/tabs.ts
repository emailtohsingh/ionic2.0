import { Component, OnInit } from '@angular/core';

import { HomePage } from '../home/home';
import { MapPage } from '../map/map';
import { SettingsPage } from '../settings/settings';
import { LoginPage } from '../login/login';
import { AuthService } from '../../providers/auth-provider/auth-service';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit {

  tabs: any = [];
  scrollableTabsopts: any = {};

  constructor(public auth: AuthService) {

  }

  ngOnInit() {
    this.tabs = [];
    if (this.auth.loggedIn) {
      this.tabs = [
        { title: "Home", root: HomePage, icon: "home", isHide: true },
        { title: "Login", root: LoginPage, icon: "log-in", isHide: false },
        { title: "Offers", root: "", icon: "search", isHide: true },
        { title: "Wishlist", root: "", icon: "heart", isHide: true },
        { title: "Notifications", root: "", icon: "notifications", isHide: true },
        { title: "Map", root: MapPage, icon: "map", isHide: true },
        { title: "Settings", root: SettingsPage, icon: "settings", isHide: true },
      ];
    } else {
      this.tabs = [
        { title: "Home", root: HomePage, icon: "home", isHide: true },
        { title: "Logout", root: "", icon: "log-out", isHide: false },
        { title: "Offers", root: "", icon: "search", isHide: true },
        { title: "Wishlist", root: "", icon: "heart", isHide: true },
        { title: "Notifications", root: "", icon: "notifications", isHide: true },
        { title: "Map", root: MapPage, icon: "map", isHide: true },
        { title: "Settings", root: SettingsPage, icon: "settings", isHide: true },
      ];
    }
    this.refreshScrollbarTabs();
    //this.toastCtrl.showNotification("Tabs are loaded");
  }

  refreshScrollbarTabs() {
    this.scrollableTabsopts = { refresh: true };
  }
}