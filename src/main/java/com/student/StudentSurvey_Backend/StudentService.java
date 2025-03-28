package com.student.StudentSurvey_Backend;

import com.student.StudentSurvey_Backend.exception.ResourceNotFoundException;
import com.student.StudentSurvey_Backend.model.*;
import com.student.StudentSurvey_Backend.model.lookup.*;
import com.student.StudentSurvey_Backend.repository.StudentRepository;
import com.student.StudentSurvey_Backend.repository.lookupRepository.CampusFeatureRepository;
import com.student.StudentSurvey_Backend.repository.lookupRepository.InterestSourceRepository;
import com.student.StudentSurvey_Backend.repository.lookupRepository.RecommendationLikelihoodRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;
    private final InterestSourceRepository interestSourceRepository;
    private final RecommendationLikelihoodRepository likelihoodRepository;
    private final CampusFeatureRepository campusFeatureRepository;

    @Transactional
    public StudentResponseDTO createStudentSurvey(StudentDTO studentDTO) {
        // Validate and convert DTO to entity
        Student student = new Student();
        mapDtoToEntity(studentDTO, student);
        
        Student savedStudent = studentRepository.save(student);
        return mapEntityToResponseDto(savedStudent);
    }

    public Page<StudentResponseDTO> getAllStudentSurveys(Pageable pageable) {
        return studentRepository.findAll(pageable)
                .map(this::mapEntityToResponseDto);
    }

    public StudentResponseDTO getStudentSurveyById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student survey not found with id: " + id));
        return mapEntityToResponseDto(student);
    }

    @Transactional
    public StudentResponseDTO updateStudentSurvey(Long id, StudentDTO studentDTO) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
        
        mapDtoToEntity(studentDTO, student);
        Student updatedStudent = studentRepository.save(student);
        return mapEntityToResponseDto(updatedStudent);
    }

    @Transactional
    public void deleteStudentSurvey(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Student not found with id: " + id);
        }
        studentRepository.deleteById(id);
    }

    public Page<StudentResponseDTO> getStudentsByInterestSource(Long interestSourceId, Pageable pageable) {
        InterestSource interestSource = interestSourceRepository.findById(interestSourceId)
                .orElseThrow(() -> new ResourceNotFoundException("Interest source not found"));
        return studentRepository.findByInterestSource(interestSource, pageable)
                .map(this::mapEntityToResponseDto);
    }

    public Page<StudentResponseDTO> getStudentsByRecommendationLikelihood(Long likelihoodId, Pageable pageable) {
        RecommendationLikelihood likelihood = likelihoodRepository.findById(likelihoodId)
                .orElseThrow(() -> new ResourceNotFoundException("Recommendation likelihood not found"));
        return studentRepository.findByRecommendationLikelihood(likelihood, pageable)
                .map(this::mapEntityToResponseDto);
    }

    public Page<StudentResponseDTO> searchStudents(String firstName, String lastName, String email, Pageable pageable) {
        return studentRepository.findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
                firstName, lastName, email, pageable)
                .map(this::mapEntityToResponseDto);
    }

    // Helper methods
    private void mapDtoToEntity(StudentDTO dto, Student entity) {
        entity.setFirstName(dto.getFirstName());
        entity.setLastName(dto.getLastName());
        entity.setStreetAddress(dto.getStreetAddress());
        entity.setCity(dto.getCity());
        entity.setState(dto.getState());
        entity.setZip(dto.getZip());
        entity.setTelephone(dto.getTelephone());
        entity.setEmail(dto.getEmail());
        entity.setSurveyDate(dto.getSurveyDate() != null ? dto.getSurveyDate() : LocalDate.now());
        entity.setAdditionalComments(dto.getAdditionalComments());

        // Handle relationships
        InterestSource interestSource = interestSourceRepository.findById(dto.getInterestSourceId())
                .orElseThrow(() -> new ResourceNotFoundException("Interest source not found"));
        entity.setInterestSource(interestSource);

        RecommendationLikelihood likelihood = likelihoodRepository.findById(dto.getRecommendationLikelihoodId())
                .orElseThrow(() -> new ResourceNotFoundException("Recommendation likelihood not found"));
        entity.setRecommendationLikelihood(likelihood);

        if (dto.getLikedCampusFeatureIds() != null) {
            List<CampusFeature> features = campusFeatureRepository.findAllById(dto.getLikedCampusFeatureIds());
            entity.setLikedCampusFeatures(Set.copyOf(features));
        }
    }

    private StudentResponseDTO mapEntityToResponseDto(Student student) {
        return StudentResponseDTO.builder()
                .id(student.getId())
                .firstName(student.getFirstName())
                .lastName(student.getLastName())
                .email(student.getEmail())
                .surveyDate(student.getSurveyDate())
                .interestSource(new LookupResponseDTO(student.getInterestSource()))
                .recommendationLikelihood(new LookupResponseDTO(student.getRecommendationLikelihood()))
                .likedCampusFeatures(student.getLikedCampusFeatures().stream()
                        .map(LookupResponseDTO::new)
                        .collect(Collectors.toSet()))
                .additionalComments(student.getAdditionalComments())
                .build();
    }

    // Statistics methods
    public List<RecommendationDistributionDTO> getRecommendationDistribution() {
        return studentRepository.countByRecommendationLikelihood().stream()
                .map(result -> new RecommendationDistributionDTO(
                        (String) result[0],
                        ((Number) result[1]).longValue()))
                .collect(Collectors.toList());
    }

    public List<Object[]> getInterestSourceDistribution() {
        return studentRepository.countByInterestSource();
    }
}