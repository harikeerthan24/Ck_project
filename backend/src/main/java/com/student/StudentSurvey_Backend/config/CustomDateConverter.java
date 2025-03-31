package com.student.StudentSurvey_Backend.config;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Arrays;
import java.util.List;

@Component
public class CustomDateConverter implements Converter<String, LocalDate> {

    private static final List<String> DATE_FORMATS = Arrays.asList(
            "yyyy-MM-dd",  // ISO format
            "dd-MM-yyyy",  // European format
            "MM/dd/yyyy",  // US format
            "dd/MM/yyyy"   // Another common format
    );

    @Override
    public LocalDate convert(String source) {
        if (source == null || source.isEmpty()) {
            return null;
        }

        // Try parsing with each format
        for (String format : DATE_FORMATS) {
            try {
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern(format);
                return LocalDate.parse(source, formatter);
            } catch (DateTimeParseException e) {
                // Continue to the next format
            }
        }

        // If all formats fail, throw an exception
        throw new IllegalArgumentException("Invalid date format: " + source + 
                ". Supported formats are: " + String.join(", ", DATE_FORMATS));
    }
} 