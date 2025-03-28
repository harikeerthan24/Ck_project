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
  subjects: string[];
  campusPreferences: string[];
  gender: string;
  enrollmentType: string;
  feedback: string;
  surveyDate: string;
  timestamp?: Date;
  interestSource: string;
  otherInterestSource: string;
  recommendationLikelihood: string;
}
