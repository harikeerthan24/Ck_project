package com.student.StudentSurvey_Backend.model;

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

    @NotBlank(message = "Street address is required")
    @Size(max = 255, message = "Street address cannot exceed 255 characters")
    private String streetAddress;

    @NotBlank(message = "City is required")
    @Size(max = 100, message = "City cannot exceed 100 characters")
    private String city;

    @NotBlank(message = "State is required")
    @Size(min = 2, max = 2, message = "State must be 2 characters")
    private String state;

    @NotBlank(message = "ZIP code is required")
    @Pattern(regexp = "^\\d{5}(-\\d{4})?$", message = "Invalid ZIP code format")
    private String zip;

    @NotBlank(message = "Telephone is required")
    @Pattern(regexp = "^\\+?[0-9\\-\\s]+$", message = "Invalid phone number format")
    private String telephone;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotNull(message = "Survey date is required")
    @PastOrPresent(message = "Survey date cannot be in the future")
    private LocalDate surveyDate;

    @NotNull(message = "Interest source is required")
    private Long interestSourceId;

    @NotNull(message = "Recommendation likelihood is required")
    private Long recommendationLikelihoodId;

    private Set<Long> likedCampusFeatureIds;

    @Size(max = 1000, message = "Comments cannot exceed 1000 characters")
    private String additionalComments;

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