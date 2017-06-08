import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageService {
  lat: any;
  lng: any;
  isLocationSaved: boolean = false;

  constructor(public storage: Storage) {
    this.storage.ready();
  }

  saveLocation(lat, lng) {
    let location = lat+","+lng;
    this.storage.set('location', location);
    this.isLocationSaved = true;
  }

  removeLocation() {
    this.storage.remove('location');
    this.isLocationSaved = false;
  }

  getLocation() {
    let location = [];
    console.log("is location saved: "+this.isLocationSaved);
    return this.storage.get('location').then((value) => {
      if(value != null){
        location.push(value);
        return new Promise((resolve, reject) => resolve(location));
      }else{
        return null;
      }
      
    }).catch(() => this.isLocationSaved = false);
  }
}