/**
 * @author Rakul CK
 * @file EnumController.java
 * @description Controller for handling enumeration data endpoints.
 * Provides API endpoints for retrieving predefined options and constants used in the survey.
 */

package com.student.StudentSurvey_Backend.controller;

import com.student.StudentSurvey_Backend.model.Student;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/enums")
public class EnumController {

    @GetMapping("/campus-features")
    public ResponseEntity<Map<String, String>> getCampusFeatures() {
        Map<String, String> campusFeatures = Arrays.stream(Student.CampusFeature.values())
                .collect(Collectors.toMap(
                        Enum::name,
                        feature -> feature.name(),
                        (a, b) -> a,
                        LinkedHashMap::new
                ));
        return ResponseEntity.ok(campusFeatures);
    }

    @GetMapping("/genders")
    public ResponseEntity<Map<String, String>> getGenders() {
        Map<String, String> genders = Arrays.stream(Student.Gender.values())
                .collect(Collectors.toMap(
                        Enum::name,
                        gender -> gender.name(),
                        (a, b) -> a,
                        LinkedHashMap::new
                ));
        return ResponseEntity.ok(genders);
    }

    @GetMapping("/interest-sources")
    public ResponseEntity<Map<String, String>> getInterestSources() {
        Map<String, String> interestSources = Arrays.stream(Student.InterestSource.values())
                .collect(Collectors.toMap(
                        Enum::name,
                        source -> source.name(),
                        (a, b) -> a,
                        LinkedHashMap::new
                ));
        return ResponseEntity.ok(interestSources);
    }

    @GetMapping("/recommendation-likelihoods")
    public ResponseEntity<Map<String, String>> getRecommendationLikelihoods() {
        Map<String, String> likelihoods = Arrays.stream(Student.RecommendationLikelihood.values())
                .collect(Collectors.toMap(
                        Enum::name,
                        likelihood -> likelihood.name(),
                        (a, b) -> a,
                        LinkedHashMap::new
                ));
        return ResponseEntity.ok(likelihoods);
    }
    
    /**
     * Format enum name for display (e.g., VERY_LIKELY → Very Likely)
     */
//     private String formatEnumName(String enumName) {
//         String[] words = enumName.split("_");
//         return Arrays.stream(words)
//                 .map(word -> word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase())
//                 .collect(Collectors.joining(" "));
//     }
} 