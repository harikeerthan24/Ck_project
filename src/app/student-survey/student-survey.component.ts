import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { Survey } from '../models/survey';
import { SurveyService } from '../services/survey.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-survey',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterLink, 
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './student-survey.component.html',
  styleUrl: './student-survey.component.scss'
})
export class StudentSurveyComponent implements OnInit, OnDestroy {
  // Default empty survey
  survey: Survey = this.getEmptySurvey();

  // Track if we're in edit mode
  isEditMode = false;
  editSurveyId: number | null = null;
  
  // Other properties
  ageInputValue: string = '';
  routeSubscription: Subscription | null = null;

  // Campus preference checkboxes
  campusPreferences = [
    { name: 'Students', selected: false },
    { name: 'Location', selected: false },
    { name: 'Campus', selected: false },
    { name: 'Atmosphere', selected: false },
    { name: 'Dorm rooms', selected: false },
    { name: 'Sports', selected: false }
  ];

  // Recommendation likelihood options
  recommendationOptions = [
    { value: 'veryLikely', label: 'Very Likely' },
    { value: 'likely', label: 'Likely' },
    { value: 'unlikely', label: 'Unlikely' }
  ];

  submitted = false;
  formValid = false;
  
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
  emailPattern = /^(?!.*\.\.)[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  phonePattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  zipCodePattern = /^\d{5}(-\d{4})?$/;
  datePattern = /^\d{4}-\d{2}-\d{2}$/;

  constructor(
    private surveyService: SurveyService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Check if we're in edit mode by looking for an id parameter
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      const surveyId = params.get('id');
      if (surveyId) {
        this.loadSurveyForEdit(Number(surveyId));
      }
    });
    
    // Set up the beforeunload handler
    window.addEventListener('beforeunload', this.beforeUnloadHandler.bind(this));
  }

  ngOnDestroy() {
    // Remove the beforeunload handler
    window.removeEventListener('beforeunload', this.beforeUnloadHandler.bind(this));
    
    // Clean up subscriptions
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  private beforeUnloadHandler(event: BeforeUnloadEvent): void {
    if (this.formHasData() && !this.submitted) {
      event.preventDefault();
      event.returnValue = '';
    }
  }

  // Load a survey for editing
  loadSurveyForEdit(id: number): void {
    if (!id) {
      this.router.navigate(['/survey-list']);
      return;
    }
    
    const surveyToEdit = this.surveyService.getSurveyById(id);
    
    if (surveyToEdit) {
      this.isEditMode = true;
      this.editSurveyId = id;
      this.survey = { ...surveyToEdit };
      
      // Set the age input value
      this.ageInputValue = this.survey.age ? this.survey.age.toString() : '';
      
      // Update campus preference checkboxes
      this.campusPreferences.forEach(preference => {
        preference.selected = this.survey.campusPreferences.includes(preference.name);
      });
    } else {
      // Handle case where survey with the given ID doesn't exist
      this.router.navigate(['/survey-list']);
    }
  }

  // Get empty survey object
  getEmptySurvey(): Survey {
    return {
      firstName: '',
      lastName: '',
      email: '',
      age: null as unknown as number,
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      telephoneNumber: '',
      subjects: [],
      campusPreferences: [],
      gender: '',
      interestSource: '',
      otherInterestSource: '',
      recommendationLikelihood: '',
      enrollmentType: '',
      feedback: '',
      surveyDate: this.getCurrentDate()
    };
  }

  // Get current date in YYYY-MM-DD format
  getCurrentDate(): string {
    const today = new Date();
    return today.toISOString().substring(0, 10);
  }

  // Field validators
  isFirstNameValid(): boolean {
    return !!this.survey.firstName.trim();
  }

  isLastNameValid(): boolean {
    return !!this.survey.lastName.trim();
  }

  isEmailValid(): boolean {
    return this.emailPattern.test(this.survey.email);
  }

  isAgeValid(): boolean {
    const age = Number(this.ageInputValue);
    return !isNaN(age) && age >= 12 && age <= 25;
  }

  isStreetAddressValid(): boolean {
    return !!this.survey.streetAddress.trim();
  }

  isCityValid(): boolean {
    return !!this.survey.city.trim();
  }

  isStateValid(): boolean {
    return !!this.survey.state.trim();
  }

  isZipCodeValid(): boolean {
    return this.zipCodePattern.test(this.survey.zipCode);
  }

  isTelephoneNumberValid(): boolean {
    return this.phonePattern.test(this.survey.telephoneNumber);
  }

  isGenderValid(): boolean {
    return !!this.survey.gender;
  }

  isInterestSourceValid(): boolean {
    if (this.survey.interestSource === 'other') {
      return !!this.survey.otherInterestSource.trim();
    }
    return !!this.survey.interestSource;
  }
  
  isRecommendationLikelihoodValid(): boolean {
    return !!this.survey.recommendationLikelihood;
  }

  areCampusPreferencesValid(): boolean {
    return this.getSelectedCampusPreferences().length > 0;
  }

  isSurveyDateValid(): boolean {
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
        value = `(${value}`;
      } else if (value.length <= 6) {
        value = `(${value.substring(0, 3)}) ${value.substring(3)}`;
      } else {
        value = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6, 10)}`;
      }
    }
    
    // Update the input value and model
    input.value = value;
    this.survey.telephoneNumber = value;
    this.markAsTouched('telephoneNumber');
  }
  
  // Format ZIP code as user types
  formatZipCode(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    
    if (value.length > 5) {
      value = `${value.substring(0, 5)}-${value.substring(5, 9)}`;
    }
    
    // Update the input value and model
    input.value = value;
    this.survey.zipCode = value;
    this.markAsTouched('zipCode');
  }
  
  // Check if field should show error
  shouldShowError(field: keyof typeof this.touchedFields): boolean {
    if (!this.touchedFields[field]) {
      return false;
    }
    
    switch (field) {
      case 'firstName':
        return !this.isFirstNameValid();
      case 'lastName':
        return !this.isLastNameValid();
      case 'email':
        return !this.isEmailValid();
      case 'age':
        return !this.isAgeValid();
      case 'streetAddress':
        return !this.isStreetAddressValid();
      case 'city':
        return !this.isCityValid();
      case 'state':
        return !this.isStateValid();
      case 'zipCode':
        return !this.isZipCodeValid();
      case 'telephoneNumber':
        return !this.isTelephoneNumberValid();
      case 'gender':
        return !this.isGenderValid();
      case 'campusPreferences':
        return !this.areCampusPreferencesValid();
      case 'interestSource':
        return !this.isInterestSourceValid();
      case 'recommendationLikelihood':
        return !this.isRecommendationLikelihoodValid();
      case 'surveyDate':
        return !this.isSurveyDateValid();
      default:
        return false;
    }
  }
  
  // Validate the entire form
  validateForm(): boolean {
    // Mark all fields as touched
    Object.keys(this.touchedFields).forEach(field => {
      this.touchedFields[field as keyof typeof this.touchedFields] = true;
    });
    
    // Create validation results object to debug failing fields
    const validations = {
      firstName: this.isFirstNameValid(),
      lastName: this.isLastNameValid(),
      email: this.isEmailValid(),
      age: this.isAgeValid(),
      streetAddress: this.isStreetAddressValid(),
      city: this.isCityValid(),
      state: this.isStateValid(),
      zipCode: this.isZipCodeValid(),
      telephone: this.isTelephoneNumberValid(),
      gender: this.isGenderValid(),
      campusPreferences: this.areCampusPreferencesValid(),
      interestSource: this.isInterestSourceValid(),
      recommendation: this.isRecommendationLikelihoodValid(),
      surveyDate: this.isSurveyDateValid()
    };
    
    // Log failing validations for debugging
    const failingFields = Object.entries(validations)
      .filter(([_, valid]) => !valid)
      .map(([field]) => field);
    
    if (failingFields.length > 0) {
      console.log('Form validation failed for these fields:', failingFields);
    }
    
    // Check if all fields are valid
    const isValid = Object.values(validations).every(valid => valid);
    
    this.formValid = isValid;
    return isValid;
  }
  
  // Get selected campus preferences
  getSelectedCampusPreferences(): string[] {
    return this.campusPreferences
      .filter(preference => preference.selected)
      .map(preference => preference.name);
  }
  
  // Submit the form
  onSubmit(): void {
    if (this.validateForm()) {
      // Update the survey with the selected campus preferences
      this.survey.campusPreferences = this.getSelectedCampusPreferences();
      
      if (this.isEditMode && this.editSurveyId) {
        // Update existing survey
        this.survey.id = this.editSurveyId;
        this.surveyService.updateSurvey(this.survey);
      } else {
        // Add new survey
        this.surveyService.addSurvey(this.survey);
      }
      
      this.submitted = true;
      console.log(this.isEditMode ? 'Survey updated:' : 'Survey submitted:', this.survey);
    } else {
      console.log('Form is invalid');
    }
  }
  
  // Reset the form
  resetForm(): void {
    this.survey = this.getEmptySurvey();
    this.ageInputValue = '';
    
    // Reset campus preference checkboxes
    this.campusPreferences.forEach(preference => {
      preference.selected = false;
    });
    
    // Reset touched state
    Object.keys(this.touchedFields).forEach(field => {
      this.touchedFields[field as keyof typeof this.touchedFields] = false;
    });
    
    // Reset form state
    this.submitted = false;
    this.formValid = false;
    this.isEditMode = false;
    this.editSurveyId = null;
  }
  
  // Navigate to welcome page
  navigateToWelcome(): void {
    // Check if form has data before navigating
    if (this.formHasData() && !this.submitted) {
      if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
        this.router.navigate(['/welcome']);
      }
    } else {
      this.router.navigate(['/welcome']);
    }
  }
  
  // Check if form has any data entered
  formHasData(): boolean {
    return (
      this.survey.firstName.trim() !== '' ||
      this.survey.lastName.trim() !== '' ||
      this.survey.email.trim() !== '' ||
      this.survey.streetAddress.trim() !== '' ||
      this.survey.city.trim() !== '' ||
      this.survey.state.trim() !== '' ||
      this.survey.zipCode.trim() !== '' ||
      this.survey.telephoneNumber.trim() !== '' ||
      this.survey.gender !== '' ||
      this.getSelectedCampusPreferences().length > 0
    );
  }
  
  // Confirm cancel
  confirmCancel(): void {
    if (this.formHasData() && !this.submitted) {
      if (confirm('You have unsaved changes. Are you sure you want to cancel?')) {
        this.navigateToWelcome();
      }
    } else {
      this.navigateToWelcome();
    }
  }
  
  // Confirm clear
  confirmClear(): void {
    if (this.formHasData() && !this.submitted) {
      if (confirm('This will clear all form data. Are you sure you want to continue?')) {
        this.resetForm();
      }
    } else {
      this.resetForm();
    }
  }
}