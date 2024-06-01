import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CartItem } from '../models/home';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  constructor(private _http: HttpClient) { }

  getCartItems(){
    return this._http.get(`${environment.apiUrl}/cart/get-cart-items`);
  }
  addCartItem(cartItem : CartItem){
    return this._http.post(`${environment.apiUrl}/cart/cartItems/add`, cartItem);
  }
}
