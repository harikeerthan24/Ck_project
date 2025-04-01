/**
 * @author Rakul CK
 * @file api.service.ts
 * @description Service for handling HTTP communication with the backend API.
 * Manages all API requests and responses for the student survey application.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from '../models/survey';
import { tap, catchError } from 'rxjs/operators';
// import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = 'http://localhost:8080/api/surveys';

  constructor(private http: HttpClient) { }

  getAllSurveys(page: number = 0, size: number = 20): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<any>(this.API_URL, { params });
  }

  getSurveyById(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${id}`);
  }

  createSurvey(survey: Survey): Observable<any> {
    console.log("Submitting survey data:", JSON.stringify(this.mapSurveyToDTO(survey)));
    return this.http.post<any>(this.API_URL, this.mapSurveyToDTO(survey)).pipe(
      tap(response => {
        console.log('Survey API response:', response);
      }),
      catchError(error => {
        console.error('Error creating survey:', error);
        if (error.error && error.error.message) {
          console.error('Backend error message:', error.error.message);
        }
        throw error; // Re-throw so the error can be handled by the subscriber
      })
    );
  }

  updateSurvey(id: number, survey: Survey): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/${id}`, this.mapSurveyToDTO(survey));
  }

  deleteSurvey(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }

  getInterestSourceDistribution(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/analytics/interest-source`);
  }

  getRecommendationDistribution(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/analytics/recommendation`);
  }

  getGenderDistribution(): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/analytics/gender`);
  }

  // Helper method to convert frontend model to backend DTO
  private mapSurveyToDTO(survey: Survey): any {
    // All enum values are already in the correct format (uppercase with underscores)
    return {
      firstName: survey.firstName,
      lastName: survey.lastName,
      email: survey.email,
      age: survey.age,
      streetAddress: survey.streetAddress,
      city: survey.city,
      state: survey.state,
      zipCode: survey.zipCode,
      telephoneNumber: survey.telephoneNumber,
      campusPreferences: survey.campusPreferences,
      gender: survey.gender,
      feedback: survey.feedback ? survey.feedback.trim() : null, // Make feedback optional
      surveyDate: this.formatDateForBackend(survey.surveyDate), // Format date consistently for backend
      interestSource: survey.interestSource,
      otherInterestSource: survey.otherInterestSource || '',
      recommendationLikelihood: survey.recommendationLikelihood
    };
  }

  // Format date to ensure it's in ISO format (YYYY-MM-DD)
  formatDateForBackend(dateStr: any): string {
    if (!dateStr) return '';
    
    // If it's already in ISO format (YYYY-MM-DD), return as is
    if (typeof dateStr === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return dateStr;
    }
    
    // Try to parse the date and format it to ISO
    try {
      // Check if it's a date object or a timestamp
      let date: Date;
      if (dateStr instanceof Date) {
        date = dateStr;
      } else if (typeof dateStr === 'number') {
        date = new Date(dateStr);
      } else {
        // Handle strings with different formats
        const dateParts = String(dateStr).split(/[-\/]/);
        
        // Check if it's in DD-MM-YYYY format
        if (dateParts.length === 3 && dateParts[0].length <= 2 && dateParts[1].length <= 2) {
          const day = parseInt(dateParts[0], 10);
          const month = parseInt(dateParts[1], 10) - 1; // JS months are 0-based
          const year = parseInt(dateParts[2], 10);
          
          date = new Date(year, month, day);
        } else {
          // Try standard Date parsing
          date = new Date(dateStr);
        }
      }

      // Verify the date is valid
      if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0]; // Get YYYY-MM-DD part
      }
      
      // If we can't determine the format, return the original string
      return String(dateStr);
    } catch (e) {
      console.error('Error parsing date:', e);
      return String(dateStr);
    }
  }
} 