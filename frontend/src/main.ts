
/**
 * @author Rakul CK , Bhavya
 * @file main.ts
 * @description Entry point for the Angular application.
 * Initializes the application and bootstraps the root component.
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
