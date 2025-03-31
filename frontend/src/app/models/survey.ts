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
  campusPreferences: string[];
  gender: string;
  feedback?: string;
  surveyDate: string;
  interestSource: string;
  otherInterestSource?: string;
  recommendationLikelihood: string;
  createdAt?: string;
  updatedAt?: string;
}
