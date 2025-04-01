/**
 * @author Rakul CK
 * @file survey.ts
 * @description Interface defining the structure of a student survey.
 * Contains all the fields and types for survey data in the frontend application.
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
