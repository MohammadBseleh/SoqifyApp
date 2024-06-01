import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = environment.apiUrl;
  constructor(private _http : HttpClient) { }

  getPosts() {
    return this._http.get<any>(`${this.apiUrl}/posts`);
  }
  getCategories(){
    return this._http.get<any>(`${this.apiUrl}/categories`);
  }
  getProductsByCategory(categoryId : number){
    return this._http.get<any>(`${this.apiUrl}/products/get-all-by-category/${categoryId}`);
  }
}
