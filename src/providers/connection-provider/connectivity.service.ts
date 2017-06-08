import {Injectable} from '@angular/core';
import {Platform} from 'ionic-angular';
import {Network} from 'ionic-native';
 
declare var Connection;
 
@Injectable()
export class ConnectivityService {
 
  onDevice: boolean;
 
  constructor(public platform: Platform){
    this.onDevice = this.platform.is('android');
  }

  isOnline(): boolean {
    if(this.onDevice && Network.type){
      return Network.type !== "NONE";
    } else {
      return navigator.onLine; 
    }
  }
 
  isOffline(): boolean {
    if(this.onDevice && Network.type){
      return Network.type === "NONE";
    } else {
      return !navigator.onLine;   
    }
  }
}