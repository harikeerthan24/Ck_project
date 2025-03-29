import { Injectable } from '@angular/core';
import { Survey } from '../models/survey';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private surveys: Survey[] = [];
  private surveysSubject = new BehaviorSubject<Survey[]>([]);

  constructor() { 
    this.loadSurveysFromStorage();
  }

  private loadSurveysFromStorage(): void {
    try {
      const storedSurveys = localStorage.getItem('surveys');
      if (storedSurveys) {
        this.surveys = JSON.parse(storedSurveys);
        this.surveysSubject.next([...this.surveys]);
      }
    } catch (error) {
      console.error('Error loading surveys from storage:', error);
      this.surveys = [];
      this.surveysSubject.next([]);
    }
  }

  addSurvey(survey: Survey): void {
    if (!survey) return;
    
    const maxId = this.surveys.reduce((max, s) => s.id && s.id > max ? s.id : max, 0);
    
    const newSurvey = {
      ...survey,
      id: maxId + 1,
      timestamp: new Date()
    };
    
    this.surveys.push(newSurvey);
    this.surveysSubject.next([...this.surveys]);
    
    // Store in localStorage for persistence
    this.saveSurveysToStorage();
    
    console.log('Survey submitted:', newSurvey);
  }

  updateSurvey(updatedSurvey: Survey): void {
    if (!updatedSurvey || !updatedSurvey.id) return;
    
    const index = this.surveys.findIndex(s => s.id === updatedSurvey.id);
    
    if (index !== -1) {
      // Preserve the original timestamp
      const originalTimestamp = this.surveys[index].timestamp;
      
      this.surveys[index] = {
        ...updatedSurvey,
        timestamp: originalTimestamp
      };
      
      this.surveysSubject.next([...this.surveys]);
      this.saveSurveysToStorage();
      console.log('Survey updated:', updatedSurvey);
    }
  }

  deleteSurvey(id: number): void {
    if (!id) return;
    
    const index = this.surveys.findIndex(s => s.id === id);
    
    if (index !== -1) {
      this.surveys.splice(index, 1);
      this.surveysSubject.next([...this.surveys]);
      this.saveSurveysToStorage();
      console.log('Survey deleted:', id);
    }
  }

  getSurveyById(id: number): Survey | undefined {
    if (!id) return undefined;
    return this.surveys.find(survey => survey.id === id);
  }

  private saveSurveysToStorage(): void {
    try {
      localStorage.setItem('surveys', JSON.stringify(this.surveys));
    } catch (error) {
      console.error('Error saving surveys to storage:', error);
    }
  }

  getAllSurveys(): Observable<Survey[]> {
    this.loadSurveysFromStorage();
    return this.surveysSubject.asObservable();
  }
}
