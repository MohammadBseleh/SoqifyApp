import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SignupRequest, loginRequest } from '../models/auth';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private token: string  = '';

  constructor(private http: HttpClient) { }

  login(loginRequest: loginRequest): Observable<any> {
    console.log(loginRequest);
    return this.http.post<any>(`${this.apiUrl}/auth/login`, loginRequest).pipe(
      tap(response => {
        // Store the token in localStorage upon successful login
        this.token = response.token;
        console.log(response);
        localStorage.setItem('jwtToken', this.token);
      })
    );
  }

  registerUser(signupRequest: SignupRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/signup`, signupRequest).pipe(
      tap(response => {
        // Store the token in localStorage upon successful registration
        this.token = response.token;
        localStorage.setItem('jwtToken', this.token);
      })
    );
  }

  // refreshToken(): Observable<any> {
  //   const refreshToken = localStorage.getItem('refreshToken');
  //   return this.http.post<any>('http://yourapi.com/auth/refresh', { refreshToken });
  // }

  logout(): void {
    // Remove the token from localStorage upon logout
    this.token = '';
    localStorage.removeItem('jwtToken');
  }

  getToken(): string | null {
    // Get the token from the service
    return this.token;
  }
}
