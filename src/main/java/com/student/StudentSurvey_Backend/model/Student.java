package com.student.StudentSurvey_Backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import com.student.StudentSurvey_Backend.model.lookup.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
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
    
    @NotBlank(message = "Street address is required")
    @Size(max = 255, message = "Street address cannot exceed 255 characters")
    @Column(nullable = false, length = 255)
    private String streetAddress;
    
    @NotBlank(message = "City is required")
    @Size(max = 100, message = "City cannot exceed 100 characters")
    @Column(nullable = false, length = 100)
    private String city;
    
    @NotBlank(message = "State is required")
    @Size(min = 2, max = 2, message = "State must be 2 characters")
    @Column(nullable = false, length = 2)
    private String state;
    
    @NotBlank(message = "ZIP code is required")
    @Pattern(regexp = "^\\d{5}(-\\d{4})?$", message = "Invalid ZIP code format")
    @Column(nullable = false, length = 10)
    private String zip;
    
    @NotBlank(message = "Telephone is required")
    @Pattern(regexp = "^\\+?[0-9\\-\\s]+$", message = "Invalid phone number format")
    @Column(nullable = false, length = 20)
    private String telephone;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Column(nullable = false, unique = true, length = 100)
    private String email;
    
    @NotNull(message = "Survey date is required")
    @PastOrPresent(message = "Survey date cannot be in the future")
    @Column(nullable = false)
    private LocalDate surveyDate;
    
    @NotNull(message = "Interest source is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "interest_source_id", nullable = false)
    private InterestSource interestSource;

    @NotNull(message = "Recommendation likelihood is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recommendation_likelihood_id", nullable = false)
    private RecommendationLikelihood recommendationLikelihood;

    @ManyToMany
    @JoinTable(
        name = "student_campus_features",
        joinColumns = @JoinColumn(name = "student_id"),
        inverseJoinColumns = @JoinColumn(name = "campus_feature_id")
    )
    @Builder.Default
    private Set<CampusFeature> likedCampusFeatures = new HashSet<>();

    @Size(max = 1000, message = "Comments cannot exceed 1000 characters")
    @Column(length = 1000)
    private String additionalComments;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Version
    private Integer version;

    // Helper methods
    public void addLikedFeature(CampusFeature feature) {
        this.likedCampusFeatures.add(feature);
    }

    public void removeLikedFeature(CampusFeature feature) {
        this.likedCampusFeatures.remove(feature);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        return id != null && id.equals(student.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}