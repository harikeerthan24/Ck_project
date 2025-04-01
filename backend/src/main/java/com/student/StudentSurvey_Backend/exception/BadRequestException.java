
/**
 * @author Rakul CK , Bhavya
 * @file BadRequestException.java
 * @description Custom exception for handling bad request errors.
 * Extends RuntimeException to allow for custom error messages.
 */

package com.student.StudentSurvey_Backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BadRequestException extends RuntimeException {
    public BadRequestException(String message) {
        super(message);
    }
} 