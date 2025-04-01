/**
 * @author Rakul CK , Bhavya
 * @file StudentController.java
 * @description REST controller handling student survey endpoints.
 * Provides API endpoints for CRUD operations on student survey data.
 */

package com.student.StudentSurvey_Backend.controller;

import com.student.StudentSurvey_Backend.StudentService;
import com.student.StudentSurvey_Backend.model.OperationStatusResponse;
import com.student.StudentSurvey_Backend.model.Student;
import com.student.StudentSurvey_Backend.model.StudentDTO;
import com.student.StudentSurvey_Backend.model.StudentResponseDTO;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/surveys")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping
    public ResponseEntity<StudentResponseDTO> createStudentSurvey(
            @Validated @RequestBody StudentDTO studentDTO) {
        System.out.println("Received student survey: " + studentDTO.toString());
        try {
            StudentResponseDTO createdSurvey = studentService.createStudentSurvey(studentDTO);
            System.out.println("Successfully created survey with ID: " + createdSurvey.getId());
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(createdSurvey);
        } catch (Exception e) {
            System.err.println("Error creating survey: " + e.getMessage());
            e.printStackTrace();
            throw e; // Re-throw to let global exception handler deal with it
        }
    }

    @GetMapping
    public ResponseEntity<Page<StudentResponseDTO>> getAllStudentSurveys(
            @PageableDefault(size = 20, sort = "createdAt") Pageable pageable) {
        Page<StudentResponseDTO> surveys = studentService.getAllStudentSurveys(pageable);
        return ResponseEntity.ok(surveys);
    }

    @GetMapping("/by-date")
    public ResponseEntity<Page<StudentResponseDTO>> getSurveysByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<StudentResponseDTO> surveys = studentService.getSurveysByDateRange(startDate, endDate, pageable);
        return ResponseEntity.ok(surveys);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentResponseDTO> getStudentSurveyById(@PathVariable Long id) {
        StudentResponseDTO survey = studentService.getStudentSurveyById(id);
        return ResponseEntity.ok(survey);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudentResponseDTO> updateStudentSurvey(
            @PathVariable Long id, 
            @Validated @RequestBody StudentDTO studentDTO) {
        StudentResponseDTO updatedSurvey = studentService.updateStudentSurvey(id, studentDTO);
        return ResponseEntity.ok(updatedSurvey);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<OperationStatusResponse> deleteStudentSurvey(@PathVariable Long id) {
        Map<String, Object> deletedSurveyInfo = studentService.deleteStudentSurvey(id);
        return ResponseEntity.ok(
            OperationStatusResponse.success(
                "Survey with ID " + id + " for " + deletedSurveyInfo.get("firstName") + " " + 
                deletedSurveyInfo.get("lastName") + " was successfully deleted",
                deletedSurveyInfo
            )
        );
    }

    @GetMapping("/analytics/interest-source")
    public ResponseEntity<Map<Student.InterestSource, Long>> getInterestSourceDistribution() {
        return ResponseEntity.ok(studentService.getInterestSourceDistribution());
    }

    @GetMapping("/analytics/recommendation")
    public ResponseEntity<Map<Student.RecommendationLikelihood, Long>> getRecommendationLikelihoodDistribution() {
        return ResponseEntity.ok(studentService.getRecommendationLikelihoodDistribution());
    }

    @GetMapping("/analytics/gender")
    public ResponseEntity<Map<Student.Gender, Long>> getGenderDistribution() {
        return ResponseEntity.ok(studentService.getGenderDistribution());
    }
}