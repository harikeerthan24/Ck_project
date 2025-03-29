import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { Survey } from '../models/survey';
import { SurveyService } from '../services/survey.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
export class StudentSurveyComponent {
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
    subjects: [],
    campusPreferences: [],
    gender: '',
    interestSource: '',
    otherInterestSource: '',
    recommendationLikelihood: '',
    enrollmentType: 'fulltime',
    feedback: '',
    surveyDate: this.getCurrentDate()
  };

  ageInputValue: string = '';  // Add a separate string field for the input

  subjects = [
    { name: 'Mathematics', selected: false },
    { name: 'Physics', selected: false },
    { name: 'Chemistry', selected: false },
    { name: 'Biology', selected: false },
    { name: 'Computer Science', selected: false }
  ];

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
    subjects: false,
    campusPreferences: false,
    interestSource: false,
    otherInterestSource: false,
    recommendationLikelihood: false,
    enrollmentType: false,
    surveyDate: false
  };

  // Validation patterns
  emailPattern = /^(?!.*\.\.)[a-zA-Z0-9._%+-]{1,64}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  phonePattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  zipCodePattern = /^\d{5}(-\d{4})?$/;
  datePattern = /^\d{4}-\d{2}-\d{2}$/;

  constructor(private surveyService: SurveyService, private router: Router) {}

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

  areSubjectsValid(): boolean {
    return this.getSelectedSubjects().length > 0;
  }

  areCampusPreferencesValid(): boolean {
    return this.getSelectedCampusPreferences().length > 0;
  }

  isEnrollmentTypeValid(): boolean {
    return !!this.survey.enrollmentType;
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
      case 'subjects':
        return this.touchedFields.subjects && !this.areSubjectsValid();
      case 'campusPreferences':
        return this.touchedFields.campusPreferences && !this.areCampusPreferencesValid();
      case 'enrollmentType':
        return this.touchedFields.enrollmentType && !this.isEnrollmentTypeValid();
      case 'surveyDate':
        return this.touchedFields.surveyDate && !this.isSurveyDateValid();
      case 'otherInterestSource':
        return this.touchedFields.otherInterestSource && 
          this.survey.interestSource === 'other' && 
          !this.survey.otherInterestSource.trim();
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
      // this.areSubjectsValid() && 
      this.areCampusPreferencesValid() &&
      // this.isEnrollmentTypeValid() &&
      this.isSurveyDateValid()
    );
  }

  getSelectedSubjects(): string[] {
    return this.subjects
      .filter(subject => subject.selected)
      .map(subject => subject.name);
  }

  getSelectedCampusPreferences(): string[] {
    return this.campusPreferences
      .filter(pref => pref.selected)
      .map(pref => pref.name);
  }

  onSubmit(): void {
    this.formValid = this.validateForm();
    
    if (this.formValid) {
      // Ensure age is a number before submission
      this.survey.age = Number(this.ageInputValue);
      // this.survey.subjects = this.getSelectedSubjects();
      this.survey.campusPreferences = this.getSelectedCampusPreferences();
      
      // Mark otherInterestSource as touched if interest source is 'other'
      if (this.survey.interestSource === 'other') {
        this.markAsTouched('otherInterestSource');
      }
      
      // Clone the survey object to avoid reference issues
      const surveyToSubmit = {...this.survey};
      this.surveyService.addSurvey(surveyToSubmit);
      this.submitted = true;
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
      subjects: [],
      campusPreferences: [],
      gender: '',
      interestSource: '',
      otherInterestSource: '',
      recommendationLikelihood: '',
      enrollmentType: 'fulltime',
      feedback: '',
      surveyDate: this.getCurrentDate()
    };
    
    this.ageInputValue = '';  // Reset the age input value
    
    this.subjects.forEach(subject => subject.selected = false);
    this.campusPreferences.forEach(pref => pref.selected = false);
    this.submitted = false;
    this.formValid = false;
    
    // Reset touched state
    Object.keys(this.touchedFields).forEach(field => {
      this.touchedFields[field as keyof typeof this.touchedFields] = false;
    });
  }

  navigateToWelcome(): void {
    // Optional: add confirmation dialog if form has data
    if (this.formHasData()) {
      if (confirm('Are you sure you want to cancel? All entered data will be lost.')) {
        this.router.navigate(['/welcome']);
      }
    } else {
      this.router.navigate(['/welcome']);
    }
  }

  formHasData(): boolean {
    // Logic to check if user has entered any data
    return !!this.survey.firstName || 
           !!this.survey.lastName || 
           !!this.survey.email ||
           !!this.survey.streetAddress ||
          //  this.getSelectedSubjects().length > 0 ||
           this.getSelectedCampusPreferences().length > 0;
  }

  confirmCancel(): void {
    // Show confirmation dialog
    if (confirm('Are you sure you want to cancel? All entered data will be lost.')) {
      this.router.navigate(['/welcome']);
    }
  }

  confirmClear(): void {
    // Show confirmation dialog
    if (confirm('Are you sure you want to clear the form? All entered data will be lost.')) {
      this.resetForm(); // Call your existing resetForm method
    }
  }

  // Add this to your StudentSurveyComponent class
  ngOnInit() {
    // Set up the beforeunload handler
    window.addEventListener('beforeunload', this.beforeUnloadHandler.bind(this));
  }

  ngOnDestroy() {
    // Clean up the event listener when component is destroyed
    window.removeEventListener('beforeunload', this.beforeUnloadHandler.bind(this));
  }

  // Check if form has unsaved data
  private beforeUnloadHandler(event: BeforeUnloadEvent): void {
    if (this.formHasData() && !this.submitted) {
      // This message may not be displayed in many modern browsers
      // Instead, a generic message from the browser might be shown
      event.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
    }
  }
}