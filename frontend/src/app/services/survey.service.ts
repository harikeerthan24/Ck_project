// import { Injectable } from '@angular/core';
// import { Survey } from '../models/survey';
// import { BehaviorSubject, Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class SurveyService {
//   private surveys: Survey[] = [];
//   private surveysSubject = new BehaviorSubject<Survey[]>([]);

//   constructor() { }

//   addSurvey(survey: Survey): void {
//     const newSurvey = {
//       ...survey,
//       id: this.surveys.length + 1,
//       timestamp: new Date()
//     };
//     this.surveys.push(newSurvey);
//     this.surveysSubject.next([...this.surveys]);
    
//     // Store in localStorage for persistence
//     localStorage.setItem('surveys', JSON.stringify(this.surveys));
    
//     console.log('Survey submitted:', newSurvey);
//   }

//   getAllSurveys(): Observable<Survey[]> {
//     // Try to load from localStorage first
//     const storedSurveys = localStorage.getItem('surveys');
//     if (storedSurveys) {
//       this.surveys = JSON.parse(storedSurveys);
//       this.surveysSubject.next([...this.surveys]);
//     }
    
//     return this.surveysSubject.asObservable();
//   }
// }
