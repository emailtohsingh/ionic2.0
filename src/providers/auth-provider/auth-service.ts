import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { REST_WEB_SERVICE_URL, AZURE_SERVICE_URL } from '../../utils/content.utils';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


declare var WindowsAzure: any;
export class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

@Injectable()
export class AuthService {
  public currentUser: User;
  HAS_LOGGED_IN = 'hasLoggedIn';
  client: any;
  userid: string;
  public loggedIn: boolean = false;
  events: Events;
  constructor(public storage: Storage, private http: Http) {
  }

  azureLogin(provider: string) {
    this.client = new WindowsAzure.MobileServiceClient(AZURE_SERVICE_URL);
    this.client.login(provider).done(this.loginResponse.bind(this), this.loginResponse.bind(this));
    this.events.publish('user:login');
  }


  loginResponse(response: any) {
    this.setUsername(response.userId);
    this.userid = response.userId;
    this.loggedIn = true;
  }

  signup(name: string) {
    this.events.publish('user:signup');
  }

  azureLogout() {
    this.loggedIn = false;
    this.client.logout();
    this.events.publish('user:logout');
  }

  setUsername(username) {
    this.storage.set('username', username);
  }

  getUsername() {
    return this.storage.get('username').then((value) => {
      return value;
    });
  }

  // return a promise
  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value;
    });
  }

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        let access = false;
        this.validateUserFromDB(credentials).subscribe(data => {
          if (data && data.status == 1) {
            this.storage.set(this.HAS_LOGGED_IN, true);
            this.loggedIn = true;
            this.storage.set("username", data.data[0].name);
            this.storage.set("phone", data.data[0].telephone);
            access = true;
            observer.next(access);
            observer.complete();
          } else {
            this.storage.set(this.HAS_LOGGED_IN, false);
            observer.next(access);
            observer.complete();
          }
          console.log(data);
        })
      });
    }
  }

  public validateUserFromDB(credentials) {
    let url = REST_WEB_SERVICE_URL + "route=rest/user&method=validateUser&email=" + credentials.email + "&password=" + credentials.password
    let response = this.http.get(url).map(res => res.json());
    return response;

  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUserInfo(): User {
    return this.currentUser;
  }

  public logout() {
    this.currentUser = null;
    this.storage.set(this.HAS_LOGGED_IN, false);
    this.loggedIn = false;
    this.storage.set("username", "Guest");
  }
}