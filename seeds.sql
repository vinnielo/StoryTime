-- KIDS SEEDS
INSERT INTO kids (name, pet, createdAt, updatedAt) VALUES ('Holden', 'Ziggy', "00:00:00", "00:00:00" );
INSERT INTO kids (name,  createdAt, updatedAt) VALUES ('Hunter',  "00:00:00", "00:00:00" );
INSERT INTO kids (name, pet, createdAt, updatedAt, sibling) VALUES ('Tommy', 'Misty', "00:00:00", "00:00:00", "Ben" );

-- GUARDIAN SEEDS

INSERT INTO guardians (name) VALUES (Cyrus);
INSERT INTO guardians (name) VALUES (Erik);

-- USER SEEDS

INSERT INTO users (email, password) VALUES (test@test.com, abc123);
INSERT INTO users (email, password) VALUES (test1@test.com, 123abc);