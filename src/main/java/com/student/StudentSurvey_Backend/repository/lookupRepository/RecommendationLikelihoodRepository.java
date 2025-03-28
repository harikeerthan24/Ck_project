package com.student.StudentSurvey_Backend.repository.lookupRepository;

import com.student.StudentSurvey_Backend.model.lookup.RecommendationLikelihood;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RecommendationLikelihoodRepository extends JpaRepository<RecommendationLikelihood, Long> {

    // Basic sorted query
    List<RecommendationLikelihood> findAllByOrderByOrderAsc();

    // Find by exact name match
    Optional<RecommendationLikelihood> findByName(String name);

    // Case-insensitive name search
    Optional<RecommendationLikelihood> findByNameIgnoreCase(String name);

    // Find by weight threshold
    List<RecommendationLikelihood> findByWeightGreaterThanEqual(int minWeight);

    // Find by active status
    List<RecommendationLikelihood> findByActiveTrueOrderByOrderAsc();

    // Paginated version of sorted query
    Page<RecommendationLikelihood> findAllByOrderByOrderAsc(Pageable pageable);

    // Find by specific sort order range
    List<RecommendationLikelihood> findByOrderBetween(int start, int end);

    // Custom query with threshold value
    @Query("SELECT rl FROM RecommendationLikelihood rl WHERE rl.thresholdValue >= :threshold ORDER BY rl.order ASC")
    List<RecommendationLikelihood> findByThresholdGreaterThanEqual(@Param("threshold") int threshold);

    // Find by multiple IDs (batch operation)
    @Query("SELECT rl FROM RecommendationLikelihood rl WHERE rl.id IN :ids ORDER BY rl.order ASC")
    List<RecommendationLikelihood> findByIdsInOrder(@Param("ids") List<Long> ids);

    // Native query for complex operations
    @Query(value = "SELECT * FROM recommendation_likelihoods WHERE weight * threshold_value > :compositeValue", 
           nativeQuery = true)
    List<RecommendationLikelihood> findByCompositeScore(@Param("compositeValue") int compositeValue);

    // Check if name exists (for validation)
    boolean existsByNameIgnoreCase(String name);

    // Count active likelihoods
    long countByActiveTrue();
}