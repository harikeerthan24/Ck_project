// Business logic for Student Survey

package com.student.StudentSurvey_Backend;

import com.student.StudentSurvey_Backend.exception.ResourceNotFoundException;
import com.student.StudentSurvey_Backend.model.*;
import com.student.StudentSurvey_Backend.repository.StudentRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;

    @Transactional
    public StudentResponseDTO createStudentSurvey(StudentDTO studentDTO) {
        System.out.println("Processing StudentDTO in service: " + studentDTO);
        
        // Log the campus preferences for debugging
        if (studentDTO.getCampusPreferences() != null) {
            System.out.println("Campus preferences: " + studentDTO.getCampusPreferences());
        } else {
            System.out.println("Campus preferences are null!");
        }
        
        // Convert DTO to entity
        try {
            Student student = mapDtoToEntity(studentDTO);
            System.out.println("Mapped to Student entity: " + student);
            Student savedStudent = studentRepository.save(student);
            System.out.println("Student saved with ID: " + savedStudent.getId());
            return mapEntityToResponseDto(savedStudent);
        } catch (Exception e) {
            System.err.println("Error in createStudentSurvey: " + e.getMessage());
            e.printStackTrace();
            throw e; // Re-throw to let controller handle it
        }
    }

    public Page<StudentResponseDTO> getAllStudentSurveys(Pageable pageable) {
        return studentRepository.findAll(pageable)
                .map(this::mapEntityToResponseDto);
    }

    public Page<StudentResponseDTO> getSurveysByDateRange(LocalDate startDate, LocalDate endDate, Pageable pageable) {
        return studentRepository.findBySurveyDateBetween(startDate, endDate, pageable)
                .map(this::mapEntityToResponseDto);
    }

    public StudentResponseDTO getStudentSurveyById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student survey with ID " + id + " was not found"));
        return mapEntityToResponseDto(student);
    }

    @Transactional
    public StudentResponseDTO updateStudentSurvey(Long id, StudentDTO studentDTO) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student survey with ID " + id + " was not found"));
        
        // Update the student entity with DTO values
        updateStudentFromDto(student, studentDTO);
        Student updatedStudent = studentRepository.save(student);
        return mapEntityToResponseDto(updatedStudent);
    }

    @Transactional
    public Map<String, Object> deleteStudentSurvey(Long id) {
        Student student = studentRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Cannot delete: Student survey with ID " + id + " was not found"));
        
        // Store just the necessary information, not the entire entity or full DTO
        Map<String, Object> deletedSurveyInfo = new HashMap<>();
        deletedSurveyInfo.put("id", student.getId());
        deletedSurveyInfo.put("firstName", student.getFirstName());
        deletedSurveyInfo.put("lastName", student.getLastName());
        
        // Delete the entity
        studentRepository.delete(student);
        
        return deletedSurveyInfo;
    }

    // Analytics methods
    public Map<Student.InterestSource, Long> getInterestSourceDistribution() {
        Map<Student.InterestSource, Long> distribution = new HashMap<>();
        for (Student.InterestSource source : Student.InterestSource.values()) {
            long count = studentRepository.countByInterestSource(source);
            distribution.put(source, count);
        }
        return distribution;
    }

    public Map<Student.RecommendationLikelihood, Long> getRecommendationLikelihoodDistribution() {
        Map<Student.RecommendationLikelihood, Long> distribution = new HashMap<>();
        for (Student.RecommendationLikelihood likelihood : Student.RecommendationLikelihood.values()) {
            long count = studentRepository.countByRecommendationLikelihood(likelihood);
            distribution.put(likelihood, count);
        }
        return distribution;
    }

    public Map<Student.Gender, Long> getGenderDistribution() {
        Map<Student.Gender, Long> distribution = new HashMap<>();
        for (Student.Gender gender : Student.Gender.values()) {
            long count = studentRepository.countByGender(gender);
            distribution.put(gender, count);
        }
        return distribution;
    }

    // Helper methods
    private Student mapDtoToEntity(StudentDTO dto) {
        return Student.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .email(dto.getEmail())
                .age(dto.getAge())
                .streetAddress(dto.getStreetAddress())
                .city(dto.getCity())
                .state(dto.getState())
                .zipCode(dto.getZipCode())
                .telephoneNumber(dto.getTelephoneNumber())
                .campusPreferences(dto.getCampusPreferences())
                .gender(dto.getGender())
                .feedback(dto.getFeedback())
                .surveyDate(dto.getSurveyDate() != null ? dto.getSurveyDate() : LocalDate.now())
                .interestSource(dto.getInterestSource())
                .otherInterestSource(dto.getOtherInterestSource())
                .recommendationLikelihood(dto.getRecommendationLikelihood())
                .build();
    }

    private void updateStudentFromDto(Student student, StudentDTO dto) {
        student.setFirstName(dto.getFirstName());
        student.setLastName(dto.getLastName());
        student.setEmail(dto.getEmail());
        student.setAge(dto.getAge());
        student.setStreetAddress(dto.getStreetAddress());
        student.setCity(dto.getCity());
        student.setState(dto.getState());
        student.setZipCode(dto.getZipCode());
        student.setTelephoneNumber(dto.getTelephoneNumber());
        student.setCampusPreferences(dto.getCampusPreferences());
        student.setGender(dto.getGender());
        student.setFeedback(dto.getFeedback());
        student.setSurveyDate(dto.getSurveyDate());
        student.setInterestSource(dto.getInterestSource());
        student.setOtherInterestSource(dto.getOtherInterestSource());
        student.setRecommendationLikelihood(dto.getRecommendationLikelihood());
    }

    private StudentResponseDTO mapEntityToResponseDto(Student student) {
        return StudentResponseDTO.builder()
                .id(student.getId())
                .firstName(student.getFirstName())
                .lastName(student.getLastName())
                .email(student.getEmail())
                .age(student.getAge())
                .streetAddress(student.getStreetAddress())
                .city(student.getCity())
                .state(student.getState())
                .zipCode(student.getZipCode())
                .telephoneNumber(student.getTelephoneNumber())
                .campusPreferences(student.getCampusPreferences())
                .gender(student.getGender())
                .feedback(student.getFeedback())
                .surveyDate(student.getSurveyDate() != null ? 
                    student.getSurveyDate().format(java.time.format.DateTimeFormatter.ofPattern("MMM dd, yyyy")) : null)
                .interestSource(student.getInterestSource())
                .otherInterestSource(student.getOtherInterestSource())
                .recommendationLikelihood(student.getRecommendationLikelihood())
                .createdAt(student.getCreatedAt())
                .updatedAt(student.getUpdatedAt())
                .build();
    }
}