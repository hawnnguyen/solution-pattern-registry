-- Insert Tags
INSERT INTO tags (tag_id, tag_name, tag_value, class_name) 
VALUES ('architecturedesign1', 'Architecture Design', 'Microservices Architecture', 'fas fa-cubes');

INSERT INTO tags (tag_id, tag_name, tag_value, class_name) 
VALUES ('platform1', 'Platform', 'AWS', null);

INSERT INTO tags (tag_id, tag_name, tag_value, class_name) 
VALUES ('architecturedesign2', 'Architecture Design', 'Data Broker', 'fas fa-network-wired');

INSERT INTO tags (tag_id, tag_name, tag_value, class_name) 
VALUES ('architecturedesign3', 'Architecture Design', 'Event Driven Architecture', 'fa-broadcast-tower');

INSERT INTO tags (tag_id, tag_name, tag_value, class_name) 
VALUES ('platform2', 'Platform', 'ECS', null);

-- Insert Patterns
INSERT INTO patterns (id, title, name, url, ring, quadrant, status, is_new, description) 
VALUES ('1', 'ECS with MSK - Rediscache', 'ECS with MSK - Rediscache', '/solution/ECS with MSK - Rediscache', 
'identify', 'enterprise', 'Moved In', 'FALSE', 
'High availability and performance for customer applications with ECS, MSK, and Redis');

INSERT INTO patterns (id, title, name, url, ring, quadrant, status, is_new, description) 
VALUES ('15', 'Data Broker for SaaS, AWS, and On-Premises Systems', 'Data Broker for SaaS, AWS, and On-Premises Systems', 
'/solution/Data Broker for SaaS, AWS, and On-Premises Systems', 'identify', 'data', 'Moved In', 'FALSE', 
'Scalable broker system for connecting SaaS, AWS, and on-premises systems.');

INSERT INTO patterns (id, title, name, url, ring, quadrant, status, is_new, description) 
VALUES ('16', 'External API Client', 'External API Client', '/solution/External API Client', 
'identify', 'integration', 'Moved In', 'FALSE', 
'Providing product capabilities to external clients and internal users via Markets.');

-- Insert Pattern Use Cases
INSERT INTO pattern_use_cases (pattern_id, use_case) 
VALUES ('15', 'Third-Party Data Connections and Centralized Broker Solutions');

INSERT INTO pattern_use_cases (pattern_id, use_case) 
VALUES ('16', 'Public API Design and Security');

-- Link Patterns with Tags
UPDATE tags SET pattern_id = '1' WHERE tag_id IN ('architecturedesign1', 'platform1');
UPDATE tags SET pattern_id = '15' WHERE tag_id IN ('architecturedesign2', 'architecturedesign3');
UPDATE tags SET pattern_id = '16' WHERE tag_id IN ('platform1', 'platform2', 'architecturedesign1');
