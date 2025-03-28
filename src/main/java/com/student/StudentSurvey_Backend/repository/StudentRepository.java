package com.student.StudentSurvey_Backend.repository;

import com.student.StudentSurvey_Backend.model.Student;
import com.student.StudentSurvey_Backend.model.lookup.InterestSource;
import com.student.StudentSurvey_Backend.model.lookup.RecommendationLikelihood;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Page<Student> findByInterestSource(InterestSource interestSource, Pageable pageable);
    Page<Student> findByRecommendationLikelihood(RecommendationLikelihood likelihood, Pageable pageable);
    
    Page<Student> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
            String firstName, String lastName, String email, Pageable pageable);

    @Query("SELECT rl.name as recommendation, COUNT(s) as count " +
           "FROM Student s JOIN s.recommendationLikelihood rl " +
           "GROUP BY rl.name")
    List<Object[]> countByRecommendationLikelihood();

    @Query("SELECT is.name as source, COUNT(s) as count " +
           "FROM Student s JOIN s.interestSource is " +
           "GROUP BY is.name")
    List<Object[]> countByInterestSource();
} 