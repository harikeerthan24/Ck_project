package com.student.StudentSurvey_Backend.model.lookup;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.Where;

import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "campus_features")
@Where(clause = "is_active = true")  // Filters out inactive features by default
@Getter
@Setter
public class CampusFeature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "is_active", nullable = false)
    private Boolean active = true;

    @Column(name = "icon_class", length = 50)
    private String iconClass;

    @Column(name = "sort_order")
    private Integer sortOrder;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Constructors
    public CampusFeature() {
    }

    public CampusFeature(String name, String description, boolean active) {
        this.name = name;
        this.description = description;
        this.active = active;
    }

    // Equals and HashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CampusFeature that = (CampusFeature) o;
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
        return "CampusFeature{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", active=" + active +
                '}';
    }
}