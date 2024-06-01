import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile, Rating } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  apiUrl = environment.apiUrl;
  constructor(private _http : HttpClient) { }

  getProfile(id? : number ): Observable<Profile>{
    if(id){
      return this._http.get<Profile>(`${this.apiUrl}/profiles/profile?id=${id}`);
    }
    return this._http.get<Profile>(`${this.apiUrl}/profiles/profile`);
  }

  postRating(rate : Rating){
    return this._http.post(`${this.apiUrl}/userProfile/rate`, rate );
  }
}
