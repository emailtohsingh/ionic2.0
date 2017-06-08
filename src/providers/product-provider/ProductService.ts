import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { REST_WEB_SERVICE_URL } from '../../utils/content.utils';


@Injectable()
export class ProductService {

  routeURL: string = REST_WEB_SERVICE_URL+'route=rest/products'
  perpage: number = 50;

  constructor(private http: Http) {
    console.log('Hello HttpProvider Provider');
  }

  getContent(url, params: any = '') {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let response = this.http.get(url).map(res => res.json());
    return response;
  }

  getProduct(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = this.routeURL + "&method=getProductById&productId=" + id;
    let response = this.http.get(url).map(res => res.json());
    return response;
  }
}
