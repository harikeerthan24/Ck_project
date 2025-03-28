-- Insert Interest Sources
INSERT INTO interest_sources (name, is_active, version, created_at, updated_at) VALUES 
('Website', true, 1, NOW(), NOW()),
('Social Media', true, 1, NOW(), NOW()),
('Friend/Family', true, 1, NOW(), NOW()),
('Email', true, 1, NOW(), NOW()),
('Other', true, 1, NOW(), NOW());

-- Insert Recommendation Likelihood
INSERT INTO recommendation_likelihoods (name, is_active, sort_order, threshold_value, version, weight, created_at, updated_at) VALUES 
('Very Likely', true, 1, 90, 1, 5, NOW(), NOW()),
('Likely', true, 2, 70, 1, 4, NOW(), NOW()),
('Neutral', true, 3, 50, 1, 3, NOW(), NOW()),
('Unlikely', true, 4, 30, 1, 2, NOW(), NOW()),
('Very Unlikely', true, 5, 10, 1, 1, NOW(), NOW());

-- Insert Campus Features
INSERT INTO campus_features (name, is_active, sort_order, created_at, updated_at) VALUES 
('Location', true, 1, NOW(), NOW()),
('Academic Programs', true, 2, NOW(), NOW()),
('Campus Size', true, 3, NOW(), NOW()),
('Cost', true, 4, NOW(), NOW()),
('Student Life', true, 5, NOW(), NOW()),
('Sports Facilities', true, 6, NOW(), NOW()),
('Library', true, 7, NOW(), NOW()),
('Career Services', true, 8, NOW(), NOW()); 