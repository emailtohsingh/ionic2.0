import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { REST_WEB_SERVICE_URL } from '../../utils/content.utils';

@Injectable()
export class CategoryService {

  constructor(public http: Http) {
    console.log('Hello Category Provider');
  }
  getCategory(){
    return this.http.get(REST_WEB_SERVICE_URL+'route=rest/categories&method=getParentCategories')
    .toPromise()
    .then(data=> data.json());
  }

  posts_category(id){
    return this.http.get(REST_WEB_SERVICE_URL+'route=rest/categories&method=retriveAllCategoriesByCatId&id='+id)
    .toPromise()
    .then(data=> data.json());
  }

}
