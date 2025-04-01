/**
 * @author Rakul CK , Bhavya
 * @file app.routes.ts
 * @description Defines the application routing configuration, specifying the paths and components
 * for different routes in the application.
 */

import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { StudentSurveyComponent } from './student-survey/student-survey.component';
import { SurveyListComponent } from './survey-list/survey-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'student-survey', component: StudentSurveyComponent },
  { path: 'survey-list', component: SurveyListComponent },
  { path: 'edit-survey/:id', component: StudentSurveyComponent },
  { path: '**', redirectTo: '/welcome' }
];
