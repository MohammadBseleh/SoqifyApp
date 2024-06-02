import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private _http: HttpClient) { }

  getDashboardData(){
    return this._http.get(`${environment.apiUrl}/auth/supplierDashboard`);
  }
}
