-- -- Initialize schema if needed
-- -- The actual tables will be created by Hibernate based on entity definitions
-- -- This file is now mainly for testing data

-- -- Insert a few sample student surveys for testing
-- INSERT INTO students (first_name, last_name, email, age, street_address, city, state, zip_code, telephone_number, gender, feedback, survey_date, interest_source, other_interest_source, recommendation_likelihood, created_at, updated_at, version) 
-- VALUES 
-- ('John', 'Doe', 'john.doe@example.com', 22, '123 Main St', 'Springfield', 'IL', '62701', '555-123-4567', 'MALE', 'Great campus tour!', '2023-10-15', 'INTERNET', NULL, 'VERY_LIKELY', NOW(), NOW(), 0),
-- ('Jane', 'Smith', 'jane.smith@example.com', 21, '456 Oak Ave', 'Chicago', 'IL', '60601', '555-987-6543', 'FEMALE', 'Enjoyed the information session.', '2023-11-05', 'FRIENDS', NULL, 'LIKELY', NOW(), NOW(), 0),
-- ('Alex', 'Johnson', 'alex.j@example.com', 19, '789 Pine Blvd', 'Evanston', 'IL', '60201', '555-222-3333', 'OTHER', 'Would like more financial aid information.', '2023-12-10', 'TELEVISION', NULL, 'UNLIKELY', NOW(), NOW(), 0);

-- -- Insert campus preferences (many-to-many relationship with students)
-- INSERT INTO student_campus_preferences (student_id, campus_preferences) VALUES 
-- (1, 'LOCATION'),
-- (1, 'CAMPUS'),
-- (1, 'SPORTS'),
-- (2, 'STUDENTS'),
-- (2, 'ATMOSPHERE'),
-- (3, 'DORM_ROOMS'),
-- (3, 'LOCATION'); 