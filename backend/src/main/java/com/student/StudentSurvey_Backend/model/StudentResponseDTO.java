/**
 * @author Rakul CK
 * @file StudentResponseDTO.java
 * @description Response DTO for student survey submissions.
 * Contains the response data structure for API endpoints handling student survey operations.
 */

package com.student.StudentSurvey_Backend.model;

import com.student.StudentSurvey_Backend.model.Student.CampusFeature;
import com.student.StudentSurvey_Backend.model.Student.Gender;
import com.student.StudentSurvey_Backend.model.Student.InterestSource;
import com.student.StudentSurvey_Backend.model.Student.RecommendationLikelihood;
import lombok.*;
// import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class StudentResponseDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private Integer age;
    private String streetAddress;
    private String city;
    private String state;
    private String zipCode;
    private String telephoneNumber;
    private Set<CampusFeature> campusPreferences;
    private Gender gender;
    private String feedback;
    private String surveyDate;
    private InterestSource interestSource;
    private String otherInterestSource;
    private RecommendationLikelihood recommendationLikelihood;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
} 