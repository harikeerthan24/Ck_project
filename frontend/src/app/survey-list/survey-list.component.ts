/**
 * @author Rakul CK
 * @file survey-list.component.ts
 * @description Component for displaying and managing the list of student surveys.
 * Handles survey listing, pagination, and survey management operations.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Survey } from '../models/survey';
// import { SurveyService } from '../services/survey.service';
import { ApiService } from '../services/api.service';

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
  surveyToDelete: Survey | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSurveys();
  }

  loadSurveys(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.apiService.getAllSurveys().subscribe({
      next: (response: any) => {
        console.log('Surveys loaded:', response);
        if (Array.isArray(response)) {
          this.surveys = response;
        } else if (response && response.content && Array.isArray(response.content)) {
          this.surveys = response.content;
        } else {
          this.surveys = [];
          console.warn('Unexpected response format from API:', response);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading surveys:', error);
        this.errorMessage = error.error?.message || 'Failed to load surveys. Please try again.';
        this.isLoading = false;
      }
    });
  }

  editSurvey(id: number | undefined): void {
    if (!id) {
      this.errorMessage = 'Cannot edit: Invalid survey ID';
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    
    // Just navigate to the edit page and let it handle loading the survey
    this.router.navigate(['/edit-survey', id]);
    this.isLoading = false;
  }

  confirmDelete(survey: Survey): void {
    this.surveyToDelete = survey;
    this.showDeleteModal = true;
  }

  cancelDelete(): void {
    this.surveyToDelete = null;
    this.showDeleteModal = false;
  }

  deleteSurvey(): void {
    if (!this.surveyToDelete || !this.surveyToDelete.id) {
      this.errorMessage = 'Cannot delete: Invalid survey ID';
      this.cancelDelete();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.apiService.deleteSurvey(this.surveyToDelete.id).subscribe({
      next: (response) => {
        console.log('Survey deleted successfully:', response);
        // Show a temporary success message
        this.errorMessage = '';
        // Add a success message
        const tempElement = document.createElement('div');
        tempElement.className = 'success-message';
        tempElement.textContent = `Survey for ${this.surveyToDelete?.firstName} ${this.surveyToDelete?.lastName} deleted successfully.`;
        document.querySelector('.survey-list-container')?.prepend(tempElement);
        
        // Remove the success message after 3 seconds
        setTimeout(() => {
          tempElement.remove();
        }, 3000);
        
        this.loadSurveys(); // Refresh the list
        this.cancelDelete(); // Close the modal
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error deleting survey:', error);
        this.errorMessage = error.error?.message || 'Failed to delete survey. Please try again.';
        this.isLoading = false;
        this.cancelDelete(); // Close the modal even on error
      }
    });
  }

  getFormattedDate(date: Date | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleString();
  }
  
  getCampusPreferencesString(campusPreferences: string[]): string {
    if (!campusPreferences || campusPreferences.length === 0) {
      return 'None selected';
    }
    return campusPreferences.join(', ');
  }
  
  getInterestSourceText(survey: Survey): string {
    if (survey.interestSource === 'OTHER' && survey.otherInterestSource) {
      return `Other: ${survey.otherInterestSource}`;
    }
    return survey.interestSource ? this.formatEnumValue(survey.interestSource) : 'Not specified';
  }
  
  getRecommendationText(recommendationLikelihood: string): string {
    if (!recommendationLikelihood) return 'Not specified';
    
    return this.formatEnumValue(recommendationLikelihood);
  }
  
  private formatEnumValue(enumValue: string): string {
    if (!enumValue) return '';
    
    // Convert SNAKE_CASE to Title Case (e.g., VERY_LIKELY to Very Likely)
    return enumValue
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
