import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { StudentSurveyComponent } from './student-survey/student-survey.component';
import { SurveyListComponent } from './survey-list/survey-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'student-survey', component: StudentSurveyComponent },
  { path: 'survey-list', component: SurveyListComponent },
  { path: '**', redirectTo: '/welcome' }
];
