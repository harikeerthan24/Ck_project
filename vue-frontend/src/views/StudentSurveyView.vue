<template>
  <div class="student-survey-container">
    <div class="header-actions">
    
      <h1>{{ isEditMode ? 'Edit Student Survey' : 'Student Survey Form' }}</h1>
    </div>
    
    <div v-if="loading" class="loading">
      <p>Loading survey data...</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="resetError" class="btn btn-primary mt-3">Try Again</button>
    </div>
    
    <form v-else @submit.prevent="submitForm" class="survey-form card">
      <!-- Personal Information -->
      <div class="form-section">
        <h2>Personal Information</h2>
        
        <div class="form-row">
          <div class="form-group">
            <label for="firstName">First Name <span class="required">*</span></label>
            <input 
              type="text" 
              id="firstName" 
              v-model="survey.firstName" 
              required
              placeholder="John"
              :class="{ 'invalid': validation.firstName }"
              @blur="validateField('firstName')"
            >
            <span v-if="validation.firstName" class="error-message">{{ validation.firstName }}</span>
          </div>
          
          <div class="form-group">
            <label for="lastName">Last Name <span class="required">*</span></label>
            <input 
              type="text" 
              id="lastName" 
              v-model="survey.lastName" 
              required
              placeholder="Smith"
              :class="{ 'invalid': validation.lastName }"
              @blur="validateField('lastName')"
            >
            <span v-if="validation.lastName" class="error-message">{{ validation.lastName }}</span>
          </div>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="email">Email <span class="required">*</span></label>
            <input 
              type="email" 
              id="email" 
              v-model="survey.email" 
              required
              placeholder="john.smith@example.com"
              :class="{ 'invalid': validation.email }"
              @blur="validateField('email')"
            >
            <span v-if="validation.email" class="error-message">{{ validation.email }}</span>
          </div>
          
          <div class="form-group">
            <label for="age">Age <span class="required">*</span></label>
            <input 
              type="number" 
              id="age" 
              v-model.number="survey.age" 
              min="12" 
              max="95"
              required
              placeholder="25"
              :class="{ 'invalid': validation.age }"
              @blur="validateField('age')"
            >
            <span v-if="validation.age" class="error-message">{{ validation.age }}</span>
          </div>
        </div>
      </div>
      
      <!-- Address Information -->
      <div class="form-section">
        <h2>Address Information</h2>
        
        <div class="form-group">
          <label for="streetAddress">Street Address <span class="required">*</span></label>
          <input 
            type="text" 
            id="streetAddress" 
            v-model="survey.streetAddress"
            required
            placeholder="123 Main Street"
            :class="{ 'invalid': validation.streetAddress }"
            @blur="validateField('streetAddress')"
          >
          <span v-if="validation.streetAddress" class="error-message">{{ validation.streetAddress }}</span>
        </div>
        
        <div class="form-row">
          <div class="form-group">
            <label for="city">City <span class="required">*</span></label>
            <input 
              type="text" 
              id="city" 
              v-model="survey.city"
              required
              placeholder="Springfield"
              :class="{ 'invalid': validation.city }"
              @blur="validateField('city')"
            >
            <span v-if="validation.city" class="error-message">{{ validation.city }}</span>
          </div>
          
          <div class="form-group">
            <label for="state">State <span class="required">*</span></label>
            <select 
              id="state" 
              v-model="survey.state"
              required
              :class="{ 'invalid': validation.state }"
              @change="validateField('state')"
            >
              <option value="" disabled>Select a state</option>
              <option v-for="state in states" :key="state" :value="state">{{ state }}</option>
            </select>
            <span v-if="validation.state" class="error-message">{{ validation.state }}</span>
          </div>
          
          <div class="form-group">
            <label for="zipCode">Zip Code <span class="required">*</span></label>
            <input 
              type="text" 
              id="zipCode" 
              v-model="survey.zipCode"
              required
              pattern="^\d{5}(-\d{4})?$"
              placeholder="12345 or 12345-6789"
              :class="{ 'invalid': validation.zipCode }"
              @blur="validateField('zipCode')"
            >
            <span v-if="validation.zipCode" class="error-message">{{ validation.zipCode }}</span>
          </div>
        </div>
        
        <div class="form-group">
          <label for="telephoneNumber">Telephone Number <span class="required">*</span></label>
          <input 
            type="tel" 
            id="telephoneNumber" 
            v-model="survey.telephoneNumber"
            required
            placeholder="e.g. (703) 859-3589"
            @input="formatPhoneNumber"
            :class="{ 'invalid': validation.telephoneNumber }"
            @blur="validateField('telephoneNumber')"
          >
          <span v-if="validation.telephoneNumber" class="error-message">{{ validation.telephoneNumber }}</span>
          <small>Format: (XXX) XXX-XXXX (US format)</small>
        </div>
      </div>
      
      <!-- Survey Information -->
      <div class="form-section">
        <h2>Survey Information</h2>
        
        <div class="form-group">
          <label>What aspects of the campus influenced your decision? <span class="required">*</span></label>
          <div class="checkbox-group">
            <div class="checkbox">
              <input type="checkbox" id="students" value="STUDENTS" v-model="survey.campusPreferences" @change="validateField('campusPreferences')">
              <label for="students">Students</label>
            </div>
            <div class="checkbox">
              <input type="checkbox" id="location" value="LOCATION" v-model="survey.campusPreferences" @change="validateField('campusPreferences')">
              <label for="location">Location</label>
            </div>
            <div class="checkbox">
              <input type="checkbox" id="campus" value="CAMPUS" v-model="survey.campusPreferences" @change="validateField('campusPreferences')">
              <label for="campus">Campus</label>
            </div>
            <div class="checkbox">
              <input type="checkbox" id="atmosphere" value="ATMOSPHERE" v-model="survey.campusPreferences" @change="validateField('campusPreferences')">
              <label for="atmosphere">Atmosphere</label>
            </div>
            <div class="checkbox">
              <input type="checkbox" id="dorm_rooms" value="DORM_ROOMS" v-model="survey.campusPreferences" @change="validateField('campusPreferences')">
              <label for="dorm_rooms">Dorm Rooms</label>
            </div>
            <div class="checkbox">
              <input type="checkbox" id="sports" value="SPORTS" v-model="survey.campusPreferences" @change="validateField('campusPreferences')">
              <label for="sports">Sports</label>
            </div>
          </div>
          <span v-if="validation.campusPreferences" class="error-message">{{ validation.campusPreferences }}</span>
        </div>
        
        <div class="form-group">
          <label>Gender <span class="required">*</span></label>
          <div class="radio-group">
            <div class="radio">
              <input type="radio" id="male" value="MALE" v-model="survey.gender" required @change="validateField('gender')">
              <label for="male">Male</label>
            </div>
            <div class="radio">
              <input type="radio" id="female" value="FEMALE" v-model="survey.gender" @change="validateField('gender')">
              <label for="female">Female</label>
            </div>
            <div class="radio">
              <input type="radio" id="other" value="OTHER" v-model="survey.gender" @change="validateField('gender')">
              <label for="other">Other</label>
            </div>
            <div class="radio">
              <input type="radio" id="prefer_not_to_say" value="PREFER_NOT_TO_SAY" v-model="survey.gender" @change="validateField('gender')">
              <label for="prefer_not_to_say">Prefer not to say</label>
            </div>
          </div>
          <span v-if="validation.gender" class="error-message">{{ validation.gender }}</span>
        </div>
        
        <div class="form-group">
          <label for="surveyDate">Survey Date <span class="required">*</span></label>
          <input 
            type="date" 
            id="surveyDate" 
            v-model="survey.surveyDate"
            required
            :class="{ 'invalid': validation.surveyDate }"
            @blur="validateField('surveyDate')"
          >
          <span v-if="validation.surveyDate" class="error-message">{{ validation.surveyDate }}</span>
        </div>
        
        <div class="form-group">
          <label>How did you hear about us? <span class="required">*</span></label>
          <div class="radio-group">
            <div class="radio">
              <input type="radio" id="friends" value="FRIENDS" v-model="survey.interestSource" required @change="validateField('interestSource')">
              <label for="friends">Friends</label>
            </div>
            <div class="radio">
              <input type="radio" id="television" value="TELEVISION" v-model="survey.interestSource" @change="validateField('interestSource')">
              <label for="television">Television</label>
            </div>
            <div class="radio">
              <input type="radio" id="internet" value="INTERNET" v-model="survey.interestSource" @change="validateField('interestSource')">
              <label for="internet">Internet</label>
            </div>
            <div class="radio">
              <input type="radio" id="other_source" value="OTHER" v-model="survey.interestSource" @change="validateField('interestSource')">
              <label for="other_source">Other</label>
            </div>
          </div>
          <span v-if="validation.interestSource" class="error-message">{{ validation.interestSource }}</span>
        </div>
        
        <div class="form-group" v-if="survey.interestSource === 'OTHER'">
          <label for="otherInterestSource">Please specify: <span class="required">*</span></label>
          <input 
            type="text" 
            id="otherInterestSource" 
            v-model="survey.otherInterestSource"
            required
            placeholder="Campus Tour, Family Member"
            :class="{ 'invalid': validation.otherInterestSource }"
            @blur="validateField('otherInterestSource')"
          >
          <span v-if="validation.otherInterestSource" class="error-message">{{ validation.otherInterestSource }}</span>
        </div>
        
        <div class="form-group">
          <label>How likely are you to recommend GMU to others? <span class="required">*</span></label>
          <div class="radio-group">
            <div class="radio">
              <input type="radio" id="very_likely" value="VERY_LIKELY" v-model="survey.recommendationLikelihood" required @change="validateField('recommendationLikelihood')">
              <label for="very_likely">Very Likely</label>
            </div>
            <div class="radio">
              <input type="radio" id="likely" value="LIKELY" v-model="survey.recommendationLikelihood" @change="validateField('recommendationLikelihood')">
              <label for="likely">Likely</label>
            </div>
            <div class="radio">
              <input type="radio" id="unlikely" value="UNLIKELY" v-model="survey.recommendationLikelihood" @change="validateField('recommendationLikelihood')">
              <label for="unlikely">Unlikely</label>
            </div>
          </div>
          <span v-if="validation.recommendationLikelihood" class="error-message">{{ validation.recommendationLikelihood }}</span>
        </div>
        
        <div class="form-group">
          <label for="feedback">Additional comments:</label>
          <textarea 
            id="feedback" 
            v-model="survey.feedback"
            rows="4"
            placeholder="Share your thoughts or feedback about your experience..."
          ></textarea>
        </div>
      </div>
      
      <div class="form-actions">
        <button type="button" @click="goBack" class="btn btn-secondary">Back</button>
        <button type="button" @click="resetForm" class="btn">Reset</button>
        <button type="submit" class="btn btn-primary">{{ isEditMode ? 'Update' : 'Submit' }}</button>
      </div>
    </form>
    
    <!-- Success Modal -->
    <div class="modal" v-if="showSuccessModal">
      <div class="modal-content">
        <h3>Success!</h3>
        <p>{{ successMessage }}</p>
        <div class="modal-actions">
          <button @click="closeSuccessModal" class="btn btn-primary">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { apiService } from '@/services/api.service';
import type { Survey } from '@/models/Survey';
import { states } from '@/models/Survey';

// Route and navigation
const router = useRouter();
const route = useRoute();

// State
const isEditMode = computed(() => route.params.id !== undefined);
const surveyId = computed(() => isEditMode.value ? Number(route.params.id) : null);
const loading = ref(false);
const error = ref<string | null>(null);
const showSuccessModal = ref(false);
const successMessage = ref('');

// Default empty survey
const emptySurvey: Survey = {
  firstName: '',
  lastName: '',
  email: '',
  age: 0,
  streetAddress: '',
  city: '',
  state: '',
  zipCode: '',
  telephoneNumber: '',
  campusPreferences: [],
  gender: '',
  feedback: '',
  surveyDate: '',
  interestSource: '',
  otherInterestSource: '',
  recommendationLikelihood: ''
};

// Create a reactive survey object
const survey = reactive<Survey>({ ...emptySurvey });

// Form validation state
const validation = reactive<Record<string, string>>({});

// Validate a single field
const validateField = (fieldName: string): void => {
  // Clear previous validation error for this field
  delete validation[fieldName];
  
  // Validate based on field name
  switch (fieldName) {
    case 'firstName':
      if (!survey.firstName.trim()) {
        validation.firstName = 'First name is required';
      } else if (/\d/.test(survey.firstName)) {
        validation.firstName = 'First name cannot contain numbers';
      }
      break;
      
    case 'lastName':
      if (!survey.lastName.trim()) {
        validation.lastName = 'Last name is required';
      } else if (/\d/.test(survey.lastName)) {
        validation.lastName = 'Last name cannot contain numbers';
      }
      break;
      
    case 'email':
      if (!survey.email.trim()) {
        validation.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(survey.email)) {
        validation.email = 'Please enter a valid email';
      }
      break;
      
    case 'age':
      if (!survey.age) {
        validation.age = 'Age is required';
      } else if (survey.age < 12 || survey.age > 95) {
        validation.age = 'Age must be between 12 and 95';
      }
      break;
      
    case 'streetAddress':
      if (!survey.streetAddress.trim()) {
        validation.streetAddress = 'Street address is required';
      }
      break;
      
    case 'city':
      if (!survey.city.trim()) {
        validation.city = 'City is required';
      }
      break;
      
    case 'state':
      if (!survey.state) {
        validation.state = 'State is required';
      }
      break;
      
    case 'zipCode':
      if (!survey.zipCode.trim()) {
        validation.zipCode = 'Zip code is required';
      } else if (!/^\d{5}(-\d{4})?$/.test(survey.zipCode)) {
        validation.zipCode = 'Please enter a valid 5-digit or 9-digit zip code';
      }
      break;
      
    case 'telephoneNumber':
      if (!survey.telephoneNumber.trim()) {
        validation.telephoneNumber = 'Telephone number is required';
      } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(survey.telephoneNumber)) {
        validation.telephoneNumber = 'Please enter a valid US phone number in (XXX) XXX-XXXX format';
      }
      break;
      
    case 'gender':
      if (!survey.gender) {
        validation.gender = 'Please select a gender option';
      }
      break;
      
    case 'campusPreferences':
      if (!survey.campusPreferences || survey.campusPreferences.length === 0) {
        validation.campusPreferences = 'Please select at least one campus preference';
      }
      break;
      
    case 'surveyDate':
      if (!survey.surveyDate) {
        validation.surveyDate = 'Survey date is required';
      }
      break;
      
    case 'interestSource':
      if (!survey.interestSource) {
        validation.interestSource = 'Please select how you heard about us';
      }
      break;
      
    case 'otherInterestSource':
      if (survey.interestSource === 'OTHER' && !survey.otherInterestSource?.trim()) {
        validation.otherInterestSource = 'Please specify the other source';
      }
      break;
      
    case 'recommendationLikelihood':
      if (!survey.recommendationLikelihood) {
        validation.recommendationLikelihood = 'Please select a recommendation option';
      }
      break;
  }
};

// Format the phone number as the user types
const formatPhoneNumber = () => {
  // Remove all non-digit characters
  let phoneNumber = survey.telephoneNumber.replace(/\D/g, '');
  
  // Format the phone number as (XXX) XXX-XXXX
  if (phoneNumber.length === 0) {
    survey.telephoneNumber = '';
  } else if (phoneNumber.length <= 3) {
    survey.telephoneNumber = `(${phoneNumber}`;
  } else if (phoneNumber.length <= 6) {
    survey.telephoneNumber = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  } else {
    // Format as (XXX) XXX-XXXX if more than 6 digits (limit to 10 digits)
    phoneNumber = phoneNumber.slice(0, 10);
    survey.telephoneNumber = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
  }
};

// Methods
const loadSurvey = async () => {
  if (!isEditMode.value) return;
  
  try {
    loading.value = true;
    error.value = null;
    
    const response = await apiService.getSurveyById(surveyId.value!);
    
    // Copy properties from response to the reactive survey object
    Object.assign(survey, response.data);
    
  } catch (err) {
    console.error('Error loading survey:', err);
    error.value = 'Failed to load survey. Please try again.';
  } finally {
    loading.value = false;
  }
};

const validateForm = (): boolean => {
  // Clear previous validation errors
  Object.keys(validation).forEach(key => delete validation[key]);
  
  let isValid = true;
  
  // Validate required fields
  if (!survey.firstName.trim()) {
    validation.firstName = 'First name is required';
    isValid = false;
  } else if (/\d/.test(survey.firstName)) {
    validation.firstName = 'First name cannot contain numbers';
    isValid = false;
  }
  
  if (!survey.lastName.trim()) {
    validation.lastName = 'Last name is required';
    isValid = false;
  } else if (/\d/.test(survey.lastName)) {
    validation.lastName = 'Last name cannot contain numbers';
    isValid = false;
  }
  
  if (!survey.email.trim()) {
    validation.email = 'Email is required';
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(survey.email)) {
    validation.email = 'Please enter a valid email';
    isValid = false;
  }
  
  if (!survey.age) {
    validation.age = 'Age is required';
    isValid = false;
  } else if (survey.age < 12 || survey.age > 95) {
    validation.age = 'Age must be between 12 and 95';
    isValid = false;
  }
  
  if (!survey.streetAddress.trim()) {
    validation.streetAddress = 'Street address is required';
    isValid = false;
  }
  
  if (!survey.city.trim()) {
    validation.city = 'City is required';
    isValid = false;
  }
  
  if (!survey.state) {
    validation.state = 'State is required';
    isValid = false;
  }
  
  if (!survey.zipCode.trim()) {
    validation.zipCode = 'Zip code is required';
    isValid = false;
  } else if (!/^\d{5}(-\d{4})?$/.test(survey.zipCode)) {
    validation.zipCode = 'Please enter a valid 5-digit or 9-digit zip code';
    isValid = false;
  }
  
  if (!survey.telephoneNumber.trim()) {
    validation.telephoneNumber = 'Telephone number is required';
    isValid = false;
  } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(survey.telephoneNumber)) {
    validation.telephoneNumber = 'Please enter a valid US phone number in (XXX) XXX-XXXX format';
    isValid = false;
  }
  
  if (!survey.gender) {
    validation.gender = 'Please select a gender option';
    isValid = false;
  }
  
  if (!survey.campusPreferences || survey.campusPreferences.length === 0) {
    validation.campusPreferences = 'Please select at least one campus preference';
    isValid = false;
  }
  
  if (!survey.surveyDate) {
    validation.surveyDate = 'Survey date is required';
    isValid = false;
  }
  
  if (!survey.interestSource) {
    validation.interestSource = 'Please select how you heard about us';
    isValid = false;
  }
  
  if (survey.interestSource === 'OTHER' && !survey.otherInterestSource?.trim()) {
    validation.otherInterestSource = 'Please specify the other source';
    isValid = false;
  }
  
  if (!survey.recommendationLikelihood) {
    validation.recommendationLikelihood = 'Please select a recommendation option';
    isValid = false;
  }
  
  return isValid;
};

const submitForm = async () => {
  if (!validateForm()) {
    // Scroll to the first error
    const firstErrorEl = document.querySelector('.invalid');
    if (firstErrorEl) {
      firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }
  
  try {
    loading.value = true;
    error.value = null;
    
    if (isEditMode.value) {
      await apiService.updateSurvey(surveyId.value!, survey);
      successMessage.value = 'Survey updated successfully!';
    } else {
      await apiService.createSurvey(survey);
      successMessage.value = 'Survey submitted successfully!';
    }
    
    showSuccessModal.value = true;
  } catch (err: any) {
    console.error('Error saving survey:', err);
    if (err.response) {
      // Server responded with an error
      error.value = err.response.data?.message || 
        `Server error: ${err.response.status} ${err.response.statusText}`;
    } else if (err.request) {
      // Request was made but no response received (network error)
      error.value = 'Could not connect to the server. Please check your network connection or try again later.';
    } else {
      // Something else happened while setting up the request
      error.value = err.message || 'Failed to save survey. Please try again.';
    }
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  // Reset the form to initial state
  if (isEditMode.value) {
    // If editing, reload the original data
    loadSurvey();
  } else {
    // If creating new, reset to empty
    Object.assign(survey, emptySurvey);
  }
  
  // Clear validation errors
  Object.keys(validation).forEach(key => delete validation[key]);
};

const closeSuccessModal = () => {
  showSuccessModal.value = false;
  
  if (!isEditMode.value) {
    // If it was a new survey, clear the form
    Object.assign(survey, emptySurvey);
  }
  
  // Navigate to survey list
  router.push('/survey-list');
};

// Method to reset error state
const resetError = () => {
  error.value = null;
};

// Add navigation method
const goBack = () => {
  router.go(-1);
};

// Lifecycle hooks
onMounted(() => {
  if (isEditMode.value) {
    loadSurvey();
  }
});

// Watch for changes to critical fields and validate them
watch(() => survey.campusPreferences, () => {
  validateField('campusPreferences');
}, { deep: true });

watch(() => survey.firstName, () => {
  if (survey.firstName) validateField('firstName');
});

watch(() => survey.lastName, () => {
  if (survey.lastName) validateField('lastName');
});

watch(() => survey.email, () => {
  if (survey.email) validateField('email');
});

watch(() => survey.zipCode, () => {
  if (survey.zipCode) validateField('zipCode');
});

watch(() => survey.telephoneNumber, () => {
  if (survey.telephoneNumber) validateField('telephoneNumber');
});

watch(() => survey.interestSource, () => {
  validateField('interestSource');
  if (survey.interestSource === 'OTHER') {
    validateField('otherInterestSource');
  }
});
</script>

<style scoped lang="scss">
.student-survey-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
  
  .header-actions {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    
    h1 {
      margin-bottom: 0;
      margin-left: auto;
      margin-right: auto;
      color: var(--color-text);
      font-weight: 700;
    }
    
    .back-btn {
      display: flex;
      align-items: center;
      
      span {
        margin-right: 0.5rem;
        font-size: 1.2rem;
      }
    }
  }
  
  .survey-form {
    padding: 2rem;
    border-radius: var(--radius);
    border: 1px solid var(--color-border);
    box-shadow: var(--shadow);
    background-color: var(--color-bg);
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: var(--color-text);
      font-weight: 500;
      font-size: 0.875rem;
      
      .required {
        color: var(--color-error);
        margin-left: 2px;
      }
    }
  }
  
  /* Remove arrows/spinners from number inputs */
  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none;
    margin: 0;
  }
  
  input[type=number] {
    -moz-appearance: textfield; /* Firefox */
  }
  
  .form-section {
    margin-bottom: 2.5rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--color-border);
    
    h2 {
      font-size: 1.25rem;
      margin-bottom: 1.5rem;
      color: var(--color-text);
      font-weight: 600;
    }
    
    &:last-of-type {
      border-bottom: none;
      margin-bottom: 1rem;
      padding-bottom: 0;
    }
  }
  
  .form-row {
    display: flex;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
    
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 0;
    }
    
    .form-group {
      flex: 1;
    }
  }
  
  .form-group {
    margin-bottom: 1.5rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .checkbox-group, .radio-group {
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    margin-top: 0.5rem;
    
    .checkbox, .radio {
      display: flex;
      align-items: center;
      
      input[type="checkbox"], input[type="radio"] {
        width: auto;
        margin-right: 0.75rem;
        cursor: pointer;
      }
      
      label {
        margin-bottom: 0;
        font-weight: normal;
        cursor: pointer;
      }
    }
  }
  
  textarea {
    min-height: 100px;
    resize: vertical;
  }
  
  .form-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 2rem;
    
    .btn {
      min-width: 100px;
    }
  }
  
  .loading, .error {
    text-align: center;
    padding: 3rem 1rem;
    border-radius: var(--radius);
    margin-bottom: 2rem;
  }
  
  .error {
    background-color: rgba(239, 65, 70, 0.1);
    border: 1px solid rgba(239, 65, 70, 0.2);
    color: var(--color-error);
  }
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    
    .modal-content {
      background-color: var(--color-bg);
      padding: 2rem;
      border-radius: var(--radius);
      max-width: 500px;
      width: 90%;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      
      h3 {
        margin-top: 0;
        color: var(--color-success);
        font-size: 1.5rem;
      }
      
      p {
        margin: 1.5rem 0;
        color: var(--color-text-secondary);
      }
      
      .modal-actions {
        margin-top: 1.5rem;
        
        .btn {
          min-width: 100px;
        }
      }
    }
  }
  
  small {
    display: block;
    color: var(--color-text-secondary);
    font-size: 0.75rem;
    margin-top: 0.25rem;
  }
  
  .mt-3 {
    margin-top: 1rem;
  }
  
  .invalid {
    border-color: var(--color-error) !important;
  }
  
  .error-message {
    display: block;
    font-size: 0.75rem;
    margin-top: 0.25rem;
    color: var(--color-error);
  }
}
</style> 