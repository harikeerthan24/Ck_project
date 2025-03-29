import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
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
  showDeleteModal = false;
  showViewModal = false;
  selectedSurveyId: number | null = null;
  selectedSurvey: Survey | undefined;

  constructor(
    private surveyService: SurveyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSurveys();
  }

  loadSurveys(): void {
    this.surveyService.getAllSurveys().subscribe(data => {
      this.surveys = data;
    });
  }

  viewSurvey(id: number): void {
    if (id) {
      this.selectedSurvey = this.surveyService.getSurveyById(id);
      this.showViewModal = true;
    }
  }

  editSurvey(id: number): void {
    if (id) {
      // Navigate to the survey form with the ID as a route parameter
      this.router.navigate(['/student-survey', { id }]);
    }
  }

  confirmDelete(id: number): void {
    if (id) {
      this.selectedSurveyId = id;
      this.showDeleteModal = true;
    }
  }

  deleteSurvey(): void {
    if (this.selectedSurveyId) {
      this.surveyService.deleteSurvey(this.selectedSurveyId);
      this.showDeleteModal = false;
      this.selectedSurveyId = null;
    }
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.selectedSurveyId = null;
  }

  closeViewModal(): void {
    this.showViewModal = false;
    this.selectedSurvey = undefined;
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
