package com.student.StudentSurvey_Backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;

import com.student.StudentSurvey_Backend.StudentService;
import com.student.StudentSurvey_Backend.model.StudentDTO;
import com.student.StudentSurvey_Backend.model.StudentResponseDTO;


@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping
    public ResponseEntity<StudentResponseDTO> createStudentSurvey(
            @Validated @RequestBody StudentDTO studentDTO) {
        StudentResponseDTO createdStudent = studentService.createStudentSurvey(studentDTO);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(createdStudent);
    }

    @GetMapping
    public ResponseEntity<Page<StudentResponseDTO>> getAllStudentSurveys(
            @PageableDefault(size = 20, sort = "createdAt") Pageable pageable) {
        Page<StudentResponseDTO> students = studentService.getAllStudentSurveys(pageable);
        return ResponseEntity.ok(students);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentResponseDTO> getStudentSurveyById(@PathVariable Long id) {
        StudentResponseDTO student = studentService.getStudentSurveyById(id);
        return ResponseEntity.ok(student);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudentResponseDTO> updateStudentSurvey(
            @PathVariable Long id, 
            @Validated @RequestBody StudentDTO studentDTO) {
        StudentResponseDTO updatedStudent = studentService.updateStudentSurvey(id, studentDTO);
        return ResponseEntity.ok(updatedStudent);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudentSurvey(@PathVariable Long id) {
        studentService.deleteStudentSurvey(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/by-interest/{interestSourceId}")
    public ResponseEntity<Page<StudentResponseDTO>> getStudentsByInterestSource(
            @PathVariable Long interestSourceId,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<StudentResponseDTO> students = studentService.getStudentsByInterestSource(interestSourceId, pageable);
        return ResponseEntity.ok(students);
    }

    @GetMapping("/by-recommendation/{likelihoodId}")
    public ResponseEntity<Page<StudentResponseDTO>> getStudentsByRecommendationLikelihood(
            @PathVariable Long likelihoodId,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<StudentResponseDTO> students = studentService.getStudentsByRecommendationLikelihood(likelihoodId, pageable);
        return ResponseEntity.ok(students);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<StudentResponseDTO>> searchStudents(
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String email,
            @PageableDefault(size = 20) Pageable pageable) {
        Page<StudentResponseDTO> students = studentService.searchStudents(firstName, lastName, email, pageable);
        return ResponseEntity.ok(students);
    }

    @GetMapping("/stats/recommendation-distribution")
    public ResponseEntity<?> getRecommendationDistribution() {
        return ResponseEntity.ok(studentService.getRecommendationDistribution());
    }

    @GetMapping("/stats/interest-source-distribution")
    public ResponseEntity<?> getInterestSourceDistribution() {
        return ResponseEntity.ok(studentService.getInterestSourceDistribution());
    }
}