/**
 * @file api.service.ts
 * @description Service for handling HTTP communication with the backend API.
 * Converts Angular's HttpClient to Axios for Vue.
 */

import axios from 'axios';
import type { Survey } from '@/models/Survey';

// Create an axios instance with default config
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/surveys',
  headers: {
    'Content-Type': 'application/json',
  },
  // Add timeout to prevent long waiting times
  timeout: 5000,
  // Allow credentials (cookies, auth headers) to be sent to the backend
  withCredentials: false
});

// Add a request interceptor to log requests
apiClient.interceptors.request.use(
  config => {
    console.log(`Request to ${config.url}:`, config.data);
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
apiClient.interceptors.response.use(
  response => {
    console.log(`Response from ${response.config.url}:`, response.status);
    return response;
  },
  error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(`Server responded with error ${error.response.status}:`, error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network error - no response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request setup error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  /**
   * Get all surveys with pagination
   */
  getAllSurveys(page: number = 0, size: number = 20) {
    return apiClient.get('', {
      params: {
        page,
        size
      }
    });
  },

  /**
   * Get a survey by ID
   */
  getSurveyById(id: number) {
    return apiClient.get(`/${id}`);
  },

  /**
   * Create a new survey
   */
  createSurvey(survey: Survey) {
    console.log("Submitting survey data:", JSON.stringify(mapSurveyToDTO(survey)));
    return apiClient.post('', mapSurveyToDTO(survey));
  },

  /**
   * Update an existing survey
   */
  updateSurvey(id: number, survey: Survey) {
    return apiClient.put(`/${id}`, mapSurveyToDTO(survey));
  },

  /**
   * Delete a survey
   */
  deleteSurvey(id: number) {
    return apiClient.delete(`/${id}`);
  },

  /**
   * Get interest source distribution for analytics
   */
  getInterestSourceDistribution() {
    return apiClient.get('/analytics/interest-source');
  },

  /**
   * Get recommendation distribution for analytics
   */
  getRecommendationDistribution() {
    return apiClient.get('/analytics/recommendation');
  },

  /**
   * Get gender distribution for analytics
   */
  getGenderDistribution() {
    return apiClient.get('/analytics/gender');
  }
};

/**
 * Helper method to convert frontend model to backend DTO
 */
function mapSurveyToDTO(survey: Survey): any {
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
    campusPreferences: survey.campusPreferences || [],
    gender: survey.gender,
    feedback: survey.feedback ? survey.feedback.trim() : null,
    surveyDate: formatDateForBackend(survey.surveyDate),
    interestSource: survey.interestSource,
    otherInterestSource: survey.otherInterestSource || '',
    recommendationLikelihood: survey.recommendationLikelihood
  };
}

/**
 * Format date to ensure it's in ISO format (YYYY-MM-DD)
 */
function formatDateForBackend(dateStr: any): string {
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