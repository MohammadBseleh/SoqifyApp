import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  product: any;

  constructor(private _http: HttpClient) { }

  getProductsByCategoryId(categoryId: number) {
    return this._http.get(`${environment.apiUrl}/products/get-all-by-category/${categoryId}`);
  }

  getProduct(){
    return this.product;
  }
  setProduct(product: any){
    this.product = product;
  }
}
