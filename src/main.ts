import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import {register as registerSwiperElements} from 'swiper/element/bundle'
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './app/jwt.interceptor';

if (environment.production) {
  enableProdMode();
}

registerSwiperElements();
bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withFetch(), withInterceptors([jwtInterceptor])),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
  ],
});
