

/**
 * @author Rakul CK , Bhavya
 * @file ResourceNotFoundException.java
 * @description Custom exception for handling resource not found errors.
 * Extends RuntimeException to allow for custom error messages.
 */

package com.student.StudentSurvey_Backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
} 