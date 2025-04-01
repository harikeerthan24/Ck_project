/**
 * @author Rakul CK
 * @file StudentDTO.java
 * @description Data Transfer Object (DTO) for student survey data.
 * Used for transferring student survey information between layers of the application.
 */

package com.student.StudentSurvey_Backend.model;

import com.student.StudentSurvey_Backend.model.Student.CampusFeature;
import com.student.StudentSurvey_Backend.model.Student.Gender;
import com.student.StudentSurvey_Backend.model.Student.InterestSource;
import com.student.StudentSurvey_Backend.model.Student.RecommendationLikelihood;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class StudentDTO {

    @NotBlank(message = "First name is required")
    @Size(max = 100, message = "First name cannot exceed 100 characters")
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 100, message = "Last name cannot exceed 100 characters")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "Invalid email format")
    private String email;

    @NotNull(message = "Age is required")
    @Min(value = 18, message = "Age must be at least 18")
    @Max(value = 100, message = "Age cannot exceed 100")
    private Integer age;

    @NotBlank(message = "Street address is required")
    @Size(max = 255, message = "Street address cannot exceed 255 characters")
    private String streetAddress;

    @NotBlank(message = "City is required")
    @Size(max = 100, message = "City cannot exceed 100 characters")
    private String city;

    @NotBlank(message = "State is required")
    @Size(min = 2, max = 20, message = "State must be 20 characters")
    private String state;

    @NotBlank(message = "ZIP code is required")
    @Pattern(regexp = "^\\d{5}(-\\d{4})?$", message = "Invalid ZIP code format")
    private String zipCode;

    @Pattern(regexp = "^\\(\\d{3}\\)\\s\\d{3}-\\d{4}$", message = "Invalid phone number format")
    private String telephoneNumber;

    @NotEmpty(message = "At least one campus preference is required")
    private Set<CampusFeature> campusPreferences;

    @NotNull(message = "Gender is required")
    private Gender gender;

    @Size(max = 1000, message = "Feedback cannot exceed 1000 characters")
    private String feedback;

    @NotNull(message = "Survey date is required")
    @PastOrPresent(message = "Survey date cannot be in the future")
    private LocalDate surveyDate;

    @NotNull(message = "Interest source is required")
    private InterestSource interestSource;

    @Size(max = 100, message = "Other interest source cannot exceed 100 characters")
    private String otherInterestSource;

    @NotNull(message = "Recommendation likelihood is required")
    private RecommendationLikelihood recommendationLikelihood;

    // Validation groups for different scenarios
    public interface BasicValidation {}
    public interface FullValidation extends BasicValidation {}

    // Custom validation method example
    @AssertTrue(message = "State must be valid", groups = FullValidation.class)
    private boolean isValidState() {
        // Add custom state validation logic if needed
        return true;
    }
}