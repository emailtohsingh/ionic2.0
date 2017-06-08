import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Platform, Loading, LoadingController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { Observable } from 'rxjs/Observable';

import { ConnectivityService } from '../../providers/connection-provider/connectivity.service';
import { StorageService } from '../../providers/services/storage.service';


import { googlemaps } from 'googlemaps'


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})

export class MapPage implements OnInit {
  private loading: Loading;
  public map_canvas;
  public map;
  public infoWindow;
  addrTitle = '<b>Your Current Location</b>';


  @ViewChild('mapCanvas') mapElement: ElementRef;
  constructor(public platform: Platform, private loadingCtrl: LoadingController, private connectivityService: ConnectivityService, public storageService: StorageService) {
  }

  ngOnInit() {
    if (this.connectivityService.isOnline()) {
      this.map = this.loadMyMap();
      this.getYourCurrentLocation();
    }
  }

  loadMyMap(location = new google.maps.LatLng(36.071584, -121.8432661)) {

    let mapOptions = {
      center: location,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };
    let mapEl = document.getElementById('map');
    let map = new google.maps.Map(mapEl, mapOptions);
    return map;
  }


  getYourCurrentLocation() {
    this.map = this.loadMyMap();
    this.getCurrentLocation().subscribe(location => {
      this.map.panTo(location);
    })
  }

  getCurrentLocation(): Observable<google.maps.LatLng> {

    this.showLoading();
    let $this = this;

    let locationObs = Observable.create(observable => {
      let options = { timeout: 10000, enableHighAccuracy: true };
      if (navigator.geolocation) {
        Geolocation.getCurrentPosition(options).then(resp => {
          let lat = resp.coords.latitude;
          let lng = resp.coords.longitude;
          let location = new google.maps.LatLng(lat, lng);
          observable.next(location);
          $this.infoWindow = new google.maps.InfoWindow({
            content: $this.addrTitle
          });

          let marker = new google.maps.Marker({
            position: $this.map.getCenter(),
            map: $this.map,
            title: $this.addrTitle
          });

          marker.addListener('click', () => {
            $this.infoWindow.open($this.map, marker);
          });

          google.maps.event.addListenerOnce($this.map, 'idle', () => {
            let mapEl = document.getElementById('map');
            mapEl.classList.add('show-map');
          });
          $this.loading.dismiss();
        },
          (err) => {
            $this.handleLocationError(true, $this.infoWindow, $this.map.getCenter());
            console.log('Geolocation Erro' + err);
            $this.loading.dismiss();
            return Observable.throw(err.json().error || 'Server error');
          })
      } else {
        $this.handleLocationError(false, $this.infoWindow, $this.map.getcenter());
      }
    })
    return locationObs;

  }

  handleLocationError(browserHasGeolocation, infoWindow, pos) {
    this.loading.dismiss();
    if (this.infoWindow) {
      this.infoWindow.setPosition(pos);
      this.infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
    }

  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();

  }
  getAddressFromLatLang() {
    this.getCurrentLocation().subscribe(location => {
      console.log("Entering getAddressFromLatLang()");
      this.storageService.saveLocation(location.lat(), location.lng())
    });
  }
}
