/**
 * @author Rakul CK
 * @file StudentSurveyBackendApplication.java
 * @description Main Spring Boot application class that serves as the entry point for the backend service.
 * Initializes the Spring application context and starts the embedded server.
 */

package com.student.StudentSurvey_Backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class StudentSurveyBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudentSurveyBackendApplication.class, args);
	}

}
