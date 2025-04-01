/**
 * @author Rakul CK
 * @file OperationStatusResponse.java
 * @description Response model for operation status messages.
 * Used to standardize API responses with success/failure status and messages.
 */

package com.student.StudentSurvey_Backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OperationStatusResponse {
    private LocalDateTime timestamp;
    private String status;
    private String message;
    private Object data;
    
    public static OperationStatusResponse success(String message) {
        return new OperationStatusResponse(LocalDateTime.now(), "SUCCESS", message, null);
    }
    
    public static OperationStatusResponse success(String message, Object data) {
        return new OperationStatusResponse(LocalDateTime.now(), "SUCCESS", message, data);
    }
} 