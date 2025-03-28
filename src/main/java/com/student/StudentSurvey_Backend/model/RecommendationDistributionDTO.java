package com.student.StudentSurvey_Backend.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class RecommendationDistributionDTO {
    private String recommendation;
    private Long count;
} 