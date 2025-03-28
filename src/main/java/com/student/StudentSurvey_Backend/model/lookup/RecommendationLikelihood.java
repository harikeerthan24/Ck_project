package com.student.StudentSurvey_Backend.model.lookup;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.Where;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "recommendation_likelihoods")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Where(clause = "is_active = true")
public class RecommendationLikelihood {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String name;

    @Column(name = "sort_order", nullable = false)
    private Integer order;

    @Column(name = "weight", nullable = false)
    @Builder.Default
    private Integer weight = 1;

    @Column(name = "description", length = 200)
    private String description;

    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private Boolean active = true;

    @Column(name = "threshold_value")
    private Integer thresholdValue;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Version
    private Integer version;

    // Constructors
    public RecommendationLikelihood(String name, Integer order) {
        this.name = name;
        this.order = order;
        this.active = true;
    }

    // Business methods
    public boolean isPositiveRecommendation() {
        return name.equalsIgnoreCase("Very Likely") || name.equalsIgnoreCase("Likely");
    }

    // Equals and HashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RecommendationLikelihood that = (RecommendationLikelihood) o;
        return Objects.equals(id, that.id) && 
               Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }

    // toString
    @Override
    public String toString() {
        return "RecommendationLikelihood{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", order=" + order +
                ", active=" + active +
                '}';
    }
}