package com.student.StudentSurvey_Backend.model;

import lombok.*;
import java.time.LocalDate;
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
    private LocalDate surveyDate;
    private LookupResponseDTO interestSource;
    private LookupResponseDTO recommendationLikelihood;
    private Set<LookupResponseDTO> likedCampusFeatures;
    private String additionalComments;
} 