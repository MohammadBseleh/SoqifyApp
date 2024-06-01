import { HttpClient, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { jwtDecode } from "jwt-decode";
import { catchError, switchMap } from "rxjs";
import { environment } from "src/environments/environment";

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    const httpClient = inject(HttpClient);
    const token = localStorage.getItem('jwtToken');
    
    const apiUrl = environment.apiUrl;
    const excludedPaths = ['/login', '/signup', '/auth/login', '/auth/signup'];
  
    if (excludedPaths.some(path => req.url.includes(path))) {
      return next(req);
    }
  
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const isExpired = decodedToken.exp < (Date.now() / 1000);
  
      if (isExpired) {
        console.log('Token expired');
        console.log('Decoded token:', decodedToken);
        
        return httpClient.post(`${apiUrl}/auth/refreshToken`, { token }).pipe(
          switchMap((response: any) => {
            const newToken = response.accessToken; // Ensure this matches your backend response
            localStorage.setItem('jwtToken', newToken);
            
            const clonedReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`
              }
            });
            return next(clonedReq);
          }),
          catchError(error => {
            // Handle refresh token failure (e.g., redirect to login)
            console.error('Refresh token failed', error);
            return next(req); // Proceed without attaching the token if refresh fails
          })
        );
      } else {
        const clonedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        return next(clonedReq);
      }
    }
  
    return next(req);

};
