/**
 * @author Rakul CK
 * @file student-survey.component.ts
 * @description Main component for the student survey form.
 * Handles form submission, validation, and data management for student survey entries.
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Survey } from '../models/survey';
// import { SurveyService } from '../services/survey.service';
import { ApiService } from '../services/api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-student-survey',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HttpClientModule],
  templateUrl: './student-survey.component.html',
  styleUrl: './student-survey.component.scss'
})
export class StudentSurveyComponent implements OnInit {
  survey: Survey = {
    firstName: '',
    lastName: '',
    email: '',
    age: null as unknown as number,
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    telephoneNumber: '',
    campusPreferences: [],
    gender: '',
    interestSource: '',
    otherInterestSource: '',
    recommendationLikelihood: '',
    feedback: '',
    surveyDate: this.getCurrentDate()
  };

  ageInputValue: string = '';  // Add a separate string field for the input

  campusPreferences = [
    { name: 'STUDENTS', selected: false },
    { name: 'LOCATION', selected: false },
    { name: 'CAMPUS', selected: false },
    { name: 'ATMOSPHERE', selected: false },
    { name: 'DORM_ROOMS', selected: false },
    { name: 'SPORTS', selected: false }
  ];

  // Recommendation likelihood options
  recommendationOptions = [
    { value: 'VERY_LIKELY', label: 'Very Likely' },
    { value: 'LIKELY', label: 'Likely' },
    { value: 'UNLIKELY', label: 'Unlikely' }
  ];

  isEditing = false;
  surveyId: number | null = null;
  submitted = false;
  formValid = false;
  isLoading = false;
  errorMessage = '';
  
  // Fields for tracking touched state
  touchedFields = {
    firstName: false,
    lastName: false,
    email: false,
    age: false,
    streetAddress: false,
    city: false,
    state: false,
    zipCode: false,
    telephoneNumber: false,
    gender: false,
    campusPreferences: false,
    interestSource: false,
    otherInterestSource: false,
    recommendationLikelihood: false,
    surveyDate: false
  };

  // Validation patterns
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  phonePattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  zipCodePattern = /^\d{5}(-\d{4})?$/;
  datePattern = /^\d{4}-\d{2}-\d{2}$/;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if we're editing an existing survey
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditing = true;
        this.surveyId = +id;
        this.loadSurvey(this.surveyId);
      }
    });
  }

  loadSurvey(id: number): void {
    this.isLoading = true;
    this.apiService.getSurveyById(id).subscribe({
      next: (survey) => {
        console.log('Original loaded survey:', JSON.stringify(survey));
        
        // Make a copy of the survey data
        this.survey = {...survey};
        
        // Set age input value
        this.ageInputValue = this.survey.age?.toString() || '';
        
        // Format survey date for the HTML date input
        if (this.survey.surveyDate) {
          console.log('Original date format:', this.survey.surveyDate);
          // Use the API service's date formatter
          this.survey.surveyDate = this.apiService.formatDateForBackend(this.survey.surveyDate);
          console.log('Formatted survey date for form:', this.survey.surveyDate);
        } else {
          // If no date, set to current date
          this.survey.surveyDate = this.getCurrentDate();
        }
        
        // Set campus preferences checkboxes
        this.updateCampusPreferenceCheckboxes();
        
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading survey:', error);
        this.errorMessage = 'Failed to load survey. Please try again.';
        this.isLoading = false;
      }
    });
  }

  updateCampusPreferenceCheckboxes(): void {
    if (!this.survey.campusPreferences) return;
    
    // Reset all checkboxes
    this.campusPreferences.forEach(pref => pref.selected = false);
    
    // Set selected based on survey data
    for (const surveyPref of this.survey.campusPreferences) {
      const prefObject = this.campusPreferences.find(p => p.name === surveyPref);
      if (prefObject) {
        prefObject.selected = true;
      }
    }
  }

  // Get current date in YYYY-MM-DD format
  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Field validators
  isFirstNameValid(): boolean {
    return !!this.survey.firstName?.trim();
  }

  isLastNameValid(): boolean {
    return !!this.survey.lastName?.trim();
  }

  isEmailValid(): boolean {
    return !!this.survey.email && this.emailPattern.test(this.survey.email);
  }

  isAgeValid(): boolean {
    const age = Number(this.ageInputValue);
    return !isNaN(age) && age >= 12 && age <= 25;
  }

  isStreetAddressValid(): boolean {
    return !!this.survey.streetAddress?.trim();
  }

  isCityValid(): boolean {
    return !!this.survey.city?.trim();
  }

  isStateValid(): boolean {
    return !!this.survey.state?.trim();
  }

  isZipCodeValid(): boolean {
    return !!this.survey.zipCode && this.zipCodePattern.test(this.survey.zipCode);
  }

  isTelephoneNumberValid(): boolean {
    return !!this.survey.telephoneNumber && this.phonePattern.test(this.survey.telephoneNumber);
  }

  isGenderValid(): boolean {
    return !!this.survey.gender;
  }

  isInterestSourceValid(): boolean {
    if (!this.survey.interestSource) return false;
    if (this.survey.interestSource === 'OTHER') {
      return !!this.survey.otherInterestSource?.trim();
    }
    return true;
  }
  
  isRecommendationLikelihoodValid(): boolean {
    return !!this.survey.recommendationLikelihood;
  }

  areCampusPreferencesValid(): boolean {
    return this.getSelectedCampusPreferences().length > 0;
  }

  isSurveyDateValid(): boolean {
    if (!this.survey.surveyDate) return false;
    return this.datePattern.test(this.survey.surveyDate);
  }

  // Mark field as touched
  markAsTouched(field: keyof typeof this.touchedFields): void {
    this.touchedFields[field] = true;
  }

  // Handle age input changes
  handleAgeInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.ageInputValue = input.value;
    
    // Convert to number for the survey model when valid
    if (this.isAgeValid()) {
      this.survey.age = Number(this.ageInputValue);
    }
    
    this.markAsTouched('age');
  }

  // Format phone number as user types
  formatPhoneNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    
    if (value.length > 0) {
      if (value.length <= 3) {
        value = value;
      } else if (value.length <= 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
      } else {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
      }
    }
    
    this.survey.telephoneNumber = value;
    this.markAsTouched('telephoneNumber');
  }

  // Format zip code as user types
  formatZipCode(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^\d-]/g, '');
    
    if (value.length > 5 && value[5] !== '-') {
      value = `${value.slice(0, 5)}-${value.slice(5)}`;
    }
    
    this.survey.zipCode = value;
    this.markAsTouched('zipCode');
  }

  // Show error only if field is touched and invalid
  shouldShowError(field: keyof typeof this.touchedFields): boolean {
    switch (field) {
      case 'firstName':
        return this.touchedFields.firstName && !this.isFirstNameValid();
      case 'lastName':
        return this.touchedFields.lastName && !this.isLastNameValid();
      case 'email':
        return this.touchedFields.email && !this.isEmailValid();
      case 'age':
        return this.touchedFields.age && !this.isAgeValid();
      case 'streetAddress':
        return this.touchedFields.streetAddress && !this.isStreetAddressValid();
      case 'city':
        return this.touchedFields.city && !this.isCityValid();
      case 'state':
        return this.touchedFields.state && !this.isStateValid();
      case 'zipCode':
        return this.touchedFields.zipCode && !this.isZipCodeValid();
      case 'telephoneNumber':
        return this.touchedFields.telephoneNumber && !this.isTelephoneNumberValid();
      case 'gender':
        return this.touchedFields.gender && !this.isGenderValid();
      case 'interestSource':
        return this.touchedFields.interestSource && !this.isInterestSourceValid();
      case 'recommendationLikelihood':
        return this.touchedFields.recommendationLikelihood && !this.isRecommendationLikelihoodValid();
      case 'campusPreferences':
        return this.touchedFields.campusPreferences && !this.areCampusPreferencesValid();
      case 'surveyDate':
        return this.touchedFields.surveyDate && !this.isSurveyDateValid();
      case 'otherInterestSource':
        return this.touchedFields.otherInterestSource && 
          this.survey.interestSource === 'OTHER' && 
          !this.survey.otherInterestSource?.trim();
      default:
        return false;
    }
  }

  validateForm(): boolean {
    // Mark all fields as touched
    Object.keys(this.touchedFields).forEach(field => {
      this.touchedFields[field as keyof typeof this.touchedFields] = true;
    });
    
    return !!(
      this.isFirstNameValid() && 
      this.isLastNameValid() && 
      this.isEmailValid() && 
      this.isAgeValid() && 
      this.isStreetAddressValid() &&
      this.isCityValid() &&
      this.isStateValid() &&
      this.isZipCodeValid() &&
      this.isTelephoneNumberValid() &&
      this.isGenderValid() && 
      this.isInterestSourceValid() &&
      this.isRecommendationLikelihoodValid() &&
      this.areCampusPreferencesValid() &&
      this.isSurveyDateValid()
    );
  }

  getSelectedCampusPreferences(): string[] {
    return this.campusPreferences
      .filter(pref => pref.selected)
      .map(pref => pref.name);
  }

  onSubmit(): void {
    this.formValid = this.validateForm();
    this.errorMessage = '';
    
    if (this.formValid) {
      try {
        this.isLoading = true;
        
        // Ensure age is a number before submission
        this.survey.age = Number(this.ageInputValue);
        
        // Get selected campus preferences
        this.survey.campusPreferences = this.getSelectedCampusPreferences();
        
        // Make sure gender is uppercase (should already be set by radio buttons)
        if (this.survey.gender && typeof this.survey.gender === 'string' && 
            !['MALE', 'FEMALE', 'OTHER'].includes(this.survey.gender)) {
          this.survey.gender = this.survey.gender.toUpperCase();
        }
        
        // Make sure interest source is uppercase (should already be set by radio buttons)
        if (this.survey.interestSource && typeof this.survey.interestSource === 'string' && 
            !['FRIENDS', 'TELEVISION', 'INTERNET', 'OTHER'].includes(this.survey.interestSource)) {
          this.survey.interestSource = this.survey.interestSource.toUpperCase();
        }
        
        // Mark otherInterestSource as touched if interest source is 'OTHER'
        if (this.survey.interestSource === 'OTHER') {
          this.markAsTouched('otherInterestSource');
          if (!this.survey.otherInterestSource?.trim()) {
            this.errorMessage = 'Please specify how you became interested';
            this.isLoading = false;
            return;
          }
        }
        
        // Clone the survey object to avoid reference issues
        const surveyToSubmit = {...this.survey};
        console.log('Submitting survey:', surveyToSubmit);
        
        // Determine if we're creating or updating
        if (this.isEditing && this.surveyId) {
          // Update existing survey
          this.apiService.updateSurvey(this.surveyId, surveyToSubmit).subscribe({
            next: (response) => {
              console.log('Survey updated successfully:', response);
              this.submitted = true;
              this.isLoading = false;
              setTimeout(() => {
                this.router.navigate(['/survey-list']);
              }, 2000);
            },
            error: (error: any) => {
              console.error('Error updating survey:', error);
              this.errorMessage = error.error?.message || 'Error updating survey. Please try again.';
              this.isLoading = false;
            }
          });
        } else {
          // Create new survey
          this.apiService.createSurvey(surveyToSubmit).subscribe({
            next: (response) => {
              console.log('Survey submitted successfully:', response);
              this.submitted = true;
              this.isLoading = false;
            },
            error: (error: any) => {
              console.error('Error submitting survey:', error);
              this.errorMessage = error.error?.message || 'Error submitting survey. Please try again.';
              this.isLoading = false;
            }
          });
        }
      } catch (error) {
        console.error('Error preparing survey data:', error);
        this.errorMessage = 'Error preparing survey data. Please check your inputs.';
        this.isLoading = false;
      }
    } else {
      console.log('Form validation failed');
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }

  resetForm(): void {
    this.survey = {
      firstName: '',
      lastName: '',
      email: '',
      age: null as unknown as number,
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      telephoneNumber: '',
      campusPreferences: [],
      gender: '',
      interestSource: '',
      otherInterestSource: '',
      recommendationLikelihood: '',
      feedback: '',
      surveyDate: this.getCurrentDate()
    };
    
    this.ageInputValue = '';  // Reset the age input value
    
    this.campusPreferences.forEach(pref => pref.selected = false);
    this.submitted = false;
    this.formValid = false;
    this.errorMessage = '';
    
    // Reset touched state
    Object.keys(this.touchedFields).forEach(field => {
      this.touchedFields[field as keyof typeof this.touchedFields] = false;
    });
    
    // If editing, go back to list
    if (this.isEditing) {
      this.router.navigate(['/survey-list']);
    }
  }
}
