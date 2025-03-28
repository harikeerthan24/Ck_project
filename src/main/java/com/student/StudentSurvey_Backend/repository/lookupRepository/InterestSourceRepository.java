package com.student.StudentSurvey_Backend.repository.lookupRepository;

import com.student.StudentSurvey_Backend.model.lookup.InterestSource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface InterestSourceRepository extends JpaRepository<InterestSource, Long> {

    // Basic find by name (exact match)
    Optional<InterestSource> findByName(String name);

    // Case-insensitive search by name
    Optional<InterestSource> findByNameIgnoreCase(String name);

    // Find all active interest sources
    List<InterestSource> findByActiveTrue();

    // Search by name containing (case-insensitive)
    List<InterestSource> findByNameContainingIgnoreCase(String namePart);

    // Check if name exists (for validation)
    boolean existsByNameIgnoreCase(String name);

    // Find by external code (if applicable)
    Optional<InterestSource> findByExternalCode(String externalCode);

    // Custom query with join (example)
    @Query("SELECT is FROM InterestSource is WHERE is.active = true ORDER BY is.name ASC")
    List<InterestSource> findAllActiveSorted();

    // Count by active status
    long countByActive(boolean active);

    // Find by multiple IDs (batch operation)
    @Query("SELECT is FROM InterestSource is WHERE is.id IN :ids AND is.active = true")
    List<InterestSource> findActiveByIds(@Param("ids") List<Long> ids);

    // Native query example (if needed)
    @Query(value = "SELECT * FROM interest_sources WHERE LOWER(name) LIKE LOWER(CONCAT('%', :searchTerm, '%'))", 
           nativeQuery = true)
    List<InterestSource> searchNative(@Param("searchTerm") String searchTerm);
}