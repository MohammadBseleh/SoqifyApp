import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import {register as registerSwiperElements} from 'swiper/element/bundle'
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { JwtInterceptor } from './app/authintication/services/jwt-interceptor.service';

if (environment.production) {
  enableProdMode();
}

registerSwiperElements();
bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withFetch()),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    provideIonicAngular(),
    provideRouter(routes),
  ],
});
