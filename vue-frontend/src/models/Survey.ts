/**
 * @file Survey.ts
 * @description Interface defining the structure of a student survey
 */

export interface Survey {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  telephoneNumber: string;
  campusPreferences?: string[];
  gender: string;
  feedback?: string;
  surveyDate: string;
  interestSource: string;
  otherInterestSource?: string;
  recommendationLikelihood: string;
  createdAt?: string;
  updatedAt?: string;
}

// Enums to match the backend
export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
  PREFER_NOT_TO_SAY = "PREFER_NOT_TO_SAY"
}

export enum InterestSource {
  FRIENDS = "FRIENDS",
  TELEVISION = "TELEVISION",
  INTERNET = "INTERNET",
  OTHER = "OTHER"
}

export enum RecommendationLikelihood {
  VERY_LIKELY = "VERY_LIKELY",
  LIKELY = "LIKELY",
  UNLIKELY = "UNLIKELY"
}

// States for dropdown
export const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
]; 