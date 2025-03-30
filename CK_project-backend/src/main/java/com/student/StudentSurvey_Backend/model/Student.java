package com.student.StudentSurvey_Backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "students")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "First name is required")
    @Size(max = 100, message = "First name cannot exceed 100 characters")
    @Column(nullable = false, length = 100)
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 100, message = "Last name cannot exceed 100 characters")
    @Column(nullable = false, length = 100)
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "Invalid email format")
    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @NotNull(message = "Age is required")
    @Min(value = 18, message = "Age must be at least 18")
    @Max(value = 100, message = "Age cannot exceed 100")
    @Column(nullable = false)
    private Integer age;

    @NotBlank(message = "Street address is required")
    @Size(max = 255, message = "Street address cannot exceed 255 characters")
    @Column(nullable = false, length = 255)
    private String streetAddress;

    @NotBlank(message = "City is required")
    @Size(max = 100, message = "City cannot exceed 100 characters")
    @Column(nullable = false, length = 100)
    private String city;

    @NotBlank(message = "State is required")
    @Size(min = 2, max = 20, message = "State must be 20 characters")
    @Column(nullable = false, length = 20)
    private String state;

    @NotBlank(message = "ZIP code is required")
    @Pattern(regexp = "^\\d{5}(-\\d{4})?$", message = "Invalid ZIP code format")
    @Column(nullable = false, length = 10)
    private String zipCode;

    @Pattern(regexp = "^\\(\\d{3}\\)\\s\\d{3}-\\d{4}$", message = "Invalid phone number format. Please use format: (XXX) XXX-XXXX")
    @Column(nullable = false, length = 20)
    private String telephoneNumber;

    public enum CampusFeature {
        STUDENTS, LOCATION, CAMPUS, ATMOSPHERE, DORM_ROOMS, SPORTS
    }

    @NotEmpty(message = "At least one campus preference is required")
    @ElementCollection(targetClass = CampusFeature.class)
    @CollectionTable(name = "student_campus_preferences", joinColumns = @JoinColumn(name = "student_id"))
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Set<CampusFeature> campusPreferences = new HashSet<>();

    public enum Gender {
        MALE, FEMALE, OTHER
    }

    @NotNull(message = "Gender is required")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Gender gender;

    @Size(max = 1000, message = "Feedback cannot exceed 1000 characters")
    @Column(nullable = true, length = 1000)
    private String feedback;

    @NotNull(message = "Survey date is required")
    @PastOrPresent(message = "Survey date cannot be in the future")
    @Column(nullable = false)
    private LocalDate surveyDate;

    public enum InterestSource {
        FRIENDS, TELEVISION, INTERNET, OTHER
    }

    @NotNull(message = "Interest source is required")
    @Enumerated(EnumType.STRING)
    private InterestSource interestSource;

    @Size(max = 100, message = "Other interest source cannot exceed 100 characters")
    @Column(length = 100)
    private String otherInterestSource;

    public enum RecommendationLikelihood {
        VERY_LIKELY, LIKELY, UNLIKELY
    }

    @NotNull(message = "Recommendation likelihood is required")
    @Enumerated(EnumType.STRING)
    private RecommendationLikelihood recommendationLikelihood;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Version
    private Integer version;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return Objects.equals(id, student.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
