import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { supplier } from '../models/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private _http: HttpClient) { }

  getSuppliers(): Observable<supplier[]> {
    return this._http.get<supplier[]>(`${environment.apiUrl}/auth/suppliers`);
  }
}
