package com.student.StudentSurvey_Backend.repository;

import com.student.StudentSurvey_Backend.model.Student;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    // Search methods
    Page<Student> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
            String firstName, String lastName, String email, Pageable pageable);

    // Find surveys by date range
    Page<Student> findBySurveyDateBetween(LocalDate startDate, LocalDate endDate, Pageable pageable);
    
    // Count methods for analytics
    long countByInterestSource(Student.InterestSource interestSource);
    long countByRecommendationLikelihood(Student.RecommendationLikelihood recommendationLikelihood);
    long countByGender(Student.Gender gender);
    
    // Aggregate queries for analytics
    @Query("SELECT s.interestSource, COUNT(s) FROM Student s GROUP BY s.interestSource")
    List<Object[]> getInterestSourceDistribution();
    
    @Query("SELECT s.recommendationLikelihood, COUNT(s) FROM Student s GROUP BY s.recommendationLikelihood")
    List<Object[]> getRecommendationLikelihoodDistribution();
    
    @Query("SELECT s.gender, COUNT(s) FROM Student s GROUP BY s.gender")
    List<Object[]> getGenderDistribution();
} 