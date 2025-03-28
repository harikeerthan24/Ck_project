package com.student.StudentSurvey_Backend.model;

import com.student.StudentSurvey_Backend.model.lookup.*;
import lombok.Getter;
import lombok.ToString;

import java.io.Serializable;

@Getter
@ToString
public class LookupResponseDTO implements Serializable {
    private final Long id;
    private final String name;
    private final String description;
    private final Integer order;
    private final Boolean active;
    private final Integer weight;  // Added for RecommendationLikelihood
    private final String iconClass; // Added for CampusFeature
    private final String type;     // Discriminator field

    // Constructor for InterestSource
    public LookupResponseDTO(InterestSource source) {
        this.id = source.getId();
        this.name = source.getName();
        this.description = source.getDescription();
        this.order = null;
        this.active = source.getActive();
        this.weight = null;
        this.iconClass = null;
        this.type = "INTEREST_SOURCE";
    }

    // Constructor for RecommendationLikelihood
    public LookupResponseDTO(RecommendationLikelihood likelihood) {
        this.id = likelihood.getId();
        this.name = likelihood.getName();
        this.description = likelihood.getDescription();
        this.order = likelihood.getOrder();
        this.active = likelihood.getActive();
        this.weight = likelihood.getWeight();
        this.iconClass = null;
        this.type = "RECOMMENDATION";
    }

    // Constructor for CampusFeature
    public LookupResponseDTO(CampusFeature feature) {
        this.id = feature.getId();
        this.name = feature.getName();
        this.description = feature.getDescription();
        this.order = feature.getSortOrder();
        this.active = feature.getActive();
        this.weight = null;
        this.iconClass = feature.getIconClass();
        this.type = "CAMPUS_FEATURE";
    }

    // Generic constructor
    public LookupResponseDTO(Long id, String name, String description, 
                           Integer order, Boolean active, Integer weight,
                           String iconClass, String type) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.order = order;
        this.active = active;
        this.weight = weight;
        this.iconClass = iconClass;
        this.type = type;
    }

    // Business methods
    public boolean isActive() {
        return active != null && active;
    }

    public boolean hasWeight() {
        return weight != null && weight > 0;
    }
}