-- KIDS SEEDS
INSERT INTO kids (name, pet, createdAt, updatedAt) VALUES ('Holden', 'Ziggy', '00:00:00', '00:00:00' );
INSERT INTO kids (name,  createdAt, updatedAt) VALUES ('Hunter',  '00:00:00', '00:00:00' );
INSERT INTO kids (name, pet, createdAt, updatedAt, sibling) VALUES ('Tommy', 'Misty', '00:00:00', '00:00:00', 'Ben' );

-- GUARDIAN SEEDS

INSERT INTO guardians (name, createdAt, updatedAt) VALUES ('Cyrus', '00:00:00', '00:00:00');
INSERT INTO guardians (name, createdAt, updatedAt) VALUES ('Erik', '00:00:00', '00:00:00');

-- USER SEEDS

INSERT INTO users (email, password, createdAt, updatedAt) VALUES ('test@test.com', 'abc123', '00:00:00', '00:00:00');
INSERT INTO users (email, password, createdAt, updatedAt) VALUES ('test1@test.com', '123abc', '00:00:00', '00:00:00');

select * from users;
select * from kids;
select * from guardians;