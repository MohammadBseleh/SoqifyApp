import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const jwtToken = localStorage.getItem('jwtToken');
    // If a token exists, clone the request and attach the token in the Authorization header
    if (jwtToken) {
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      return next.handle(clonedRequest);
    }

    // If no token exists, just pass the original request through
    return next.handle(request);
  }
}
