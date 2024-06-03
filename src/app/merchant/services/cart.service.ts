import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CartItem } from '../models/home';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  constructor(private _http: HttpClient) { }

  getCartItems(): Observable<any[]>{
    return this._http.get<any[]>(`${environment.apiUrl}/cart/cartItems`);
  }
  addCartItem(cartItem : CartItem){
    return this._http.post(`${environment.apiUrl}/cart/cartItems/add`, cartItem);
  }
  deleteCartItem(id : number){
    return this._http.delete(`${environment.apiUrl}/cart/cartItems/${id}`);
  }
  ConvertToOrder(): Observable<void>{
    return this._http.delete<void>(`${environment.apiUrl}/orders/create`);
  }
}
