import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Survey } from '../models/survey';
import { SurveyService } from '../services/survey.service';

@Component({
  selector: 'app-survey-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './survey-list.component.html',
  styleUrl: './survey-list.component.scss'
})
export class SurveyListComponent implements OnInit {
  surveys: Survey[] = [];

  constructor(private surveyService: SurveyService) {}

  ngOnInit(): void {
    this.loadSurveys();
  }

  loadSurveys(): void {
    this.surveyService.getAllSurveys().subscribe(data => {
      this.surveys = data;
    });
  }

  getFormattedDate(date: Date | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleString();
  }

  // getSubjectsString(subjects: string[]): string {
  //   if (!subjects || subjects.length === 0) {
  //     return 'None selected';
  //   }
  //   return subjects.join(', ');
  // }
  
  getCampusPreferencesString(campusPreferences: string[]): string {
    if (!campusPreferences || campusPreferences.length === 0) {
      return 'None selected';
    }
    return campusPreferences.join(', ');
  }
  
  getInterestSourceText(survey: Survey): string {
    if (survey.interestSource === 'other' && survey.otherInterestSource) {
      return `Other: ${survey.otherInterestSource}`;
    }
    return survey.interestSource ? this.capitalize(survey.interestSource) : 'Not specified';
  }
  
  getRecommendationText(recommendationLikelihood: string): string {
    switch (recommendationLikelihood) {
      case 'veryLikely':
        return 'Very Likely';
      case 'likely':
        return 'Likely';
      case 'unlikely':
        return 'Unlikely';
      default:
        return 'Not specified';
    }
  }
  
  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
