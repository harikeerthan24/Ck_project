
/**
 * @author Rakul CK , Bhavya
 * @file ErrorResponse.java
 * @description Custom error response class for API exceptions.
 * Handles error details and formatting for API responses.
 */

package com.student.StudentSurvey_Backend.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResponse {
    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;
    private String path;
} 