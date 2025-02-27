-- Insert Patterns
INSERT INTO patterns (id, name, description, title, url, quadrant, ring, phase, status) 
VALUES ('1', 'ECS with MSK - Rediscache', 
'High availability and performance for customer applications with ECS, MSK, and Redis',
'ECS MSK Redis Pattern',
'https://aws.amazon.com/ecs/',
'enterprise', 'identify', 'development', 'Moved In');

INSERT INTO patterns (id, name, description, title, url, quadrant, ring, phase, status) 
VALUES ('2', 'Data Broker for SaaS, AWS, and On-Premises Systems',
'Scalable broker system for connecting SaaS, AWS, and on-premises systems.',
'Data Broker Pattern',
'https://aws.amazon.com/solutions/implementations/aws-saas-factory-data-analytics-reference/',
'data', 'identify', 'development', 'Moved In');

INSERT INTO patterns (id, name, description, title, url, quadrant, ring, phase, status) 
VALUES ('3', 'External API Client',
'Providing product capabilities to external clients and internal users via Markets.',
'External API Pattern',
'https://docs.aws.amazon.com/apigateway/',
'integration', 'identify', 'development', 'Moved In');

-- Insert Tags
INSERT INTO tags (tag_id, tag_name, tag_value, class_name, pattern_id) 
VALUES ('1', 'Architecture Design', 'Microservices Architecture', 'fas fa-cubes', '1');

INSERT INTO tags (tag_id, tag_name, tag_value, class_name, pattern_id) 
VALUES ('2', 'Platform', 'AWS', 'fas fa-cloud', '1');

INSERT INTO tags (tag_id, tag_name, tag_value, class_name, pattern_id) 
VALUES ('3', 'Architecture Design', 'Data Broker', 'fas fa-network-wired', '2');

INSERT INTO tags (tag_id, tag_name, tag_value, class_name, pattern_id) 
VALUES ('4', 'Architecture Design', 'Event Driven Architecture', 'fas fa-broadcast-tower', '2');

INSERT INTO tags (tag_id, tag_name, tag_value, class_name, pattern_id) 
VALUES ('5', 'Platform', 'ECS', 'fas fa-server', '3');
