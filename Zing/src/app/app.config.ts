import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './helper/auth-interceptor.service';
import { authErrorInterceptorProvider } from './helper/error-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideClientHydration(), 
    provideAnimationsAsync(), 
    HttpClientModule,
    authInterceptorProviders,
    authErrorInterceptorProvider,
    
  ]
};
