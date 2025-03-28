package com.student.StudentSurvey_Backend.repository.lookupRepository;

import com.student.StudentSurvey_Backend.model.lookup.CampusFeature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface CampusFeatureRepository extends JpaRepository<CampusFeature, Long> {

    // Find all active features (default method)
    List<CampusFeature> findByActiveTrue();

    // Find by name (case-insensitive)
    Optional<CampusFeature> findByNameIgnoreCase(String name);

    // Find all features sorted by sortOrder
    List<CampusFeature> findAllByOrderBySortOrderAsc();

    // Find active features by IDs
    @Query("SELECT cf FROM CampusFeature cf WHERE cf.id IN :ids AND cf.active = true")
    List<CampusFeature> findActiveByIds(@Param("ids") Set<Long> ids);

    // Count active features
    long countByActiveTrue();

    // Check if feature exists by name
    boolean existsByNameIgnoreCase(String name);

    // Find features containing search term in name or description
    @Query("SELECT cf FROM CampusFeature cf WHERE " +
           "LOWER(cf.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(cf.description) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<CampusFeature> search(@Param("searchTerm") String searchTerm);

    // Find features by icon class
    List<CampusFeature> findByIconClass(String iconClass);

    // Find features with sort order greater than specified value
    List<CampusFeature> findBySortOrderGreaterThan(Integer sortOrder);
}