
/**
 * @author Rakul CK , Bhavya
 * @file WebConfig.java
 * @description Configuration for Spring Web MVC.
 * Handles CORS configuration and date formatting for survey submissions.
 */

package com.student.StudentSurvey_Backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("Content-Type", "Authorization", "Accept")
                // .allowCredentials(true) // Only if you need credentials
                .maxAge(3600);
    }
    
    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(new CustomDateConverter());
    }
}