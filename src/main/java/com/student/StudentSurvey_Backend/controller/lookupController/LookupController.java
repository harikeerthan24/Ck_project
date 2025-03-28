package com.student.StudentSurvey_Backend.controller.lookupController;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.student.StudentSurvey_Backend.model.LookupResponseDTO;
import com.student.StudentSurvey_Backend.repository.lookupRepository.CampusFeatureRepository;
import com.student.StudentSurvey_Backend.repository.lookupRepository.InterestSourceRepository;
import com.student.StudentSurvey_Backend.repository.lookupRepository.RecommendationLikelihoodRepository;

@RestController
@RequestMapping("/api/lookups")
public class LookupController {

    private final InterestSourceRepository interestSourceRepo;
    private final RecommendationLikelihoodRepository likelihoodRepo;
    private final CampusFeatureRepository campusFeatureRepo;

    public LookupController(InterestSourceRepository interestSourceRepo,
                          RecommendationLikelihoodRepository likelihoodRepo,
                          CampusFeatureRepository campusFeatureRepo) {
        this.interestSourceRepo = interestSourceRepo;
        this.likelihoodRepo = likelihoodRepo;
        this.campusFeatureRepo = campusFeatureRepo;
    }

    @GetMapping("/interest-sources")
    public List<LookupResponseDTO> getAllInterestSources() {
        return interestSourceRepo.findAll().stream()
            .map(LookupResponseDTO::new)
            .collect(Collectors.toList());
    }

    @GetMapping("/recommendation-likelihoods")
    public List<LookupResponseDTO> getAllLikelihoods() {
        return likelihoodRepo.findAllByOrderByOrderAsc().stream()
            .map(LookupResponseDTO::new)  // Fixed from max() to map()
            .collect(Collectors.toList());
    }

    @GetMapping("/campus-features")
    public List<LookupResponseDTO> getActiveCampusFeatures() {
        return campusFeatureRepo.findByActiveTrue().stream()
            .map(LookupResponseDTO::new)
            .collect(Collectors.toList());
    }

    @GetMapping("/all-campus-features")
    public List<LookupResponseDTO> getAllCampusFeatures() {
        return campusFeatureRepo.findAll().stream()
            .map(LookupResponseDTO::new)
            .collect(Collectors.toList());
    }
}