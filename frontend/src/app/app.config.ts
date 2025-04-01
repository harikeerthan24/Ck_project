/**
 * @author Rakul CK
 * @file app.config.ts
 * @description Application configuration file that sets up Angular application providers,
 * including HTTP client and routing configuration.
 */

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch())
  ]
};
