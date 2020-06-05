-- KIDS SEEDS
INSERT INTO kids (name, pet, createdAt, updatedAt) VALUES ('Holden', 'Ziggy', '00:00:00', '00:00:00' );
INSERT INTO kids (name,  createdAt, updatedAt) VALUES ('Hunter',  '00:00:00', '00:00:00' );
INSERT INTO kids (name, pet, createdAt, updatedAt, sibling) VALUES ('Tommy', 'Misty', '00:00:00', '00:00:00', 'Ben' );


-- USER SEEDS

INSERT INTO users (email, password, createdAt, updatedAt) VALUES ('test@test.com', 'abc123', '00:00:00', '00:00:00');
INSERT INTO users (email, password, createdAt, updatedAt) VALUES ('test1@test.com', '123abc', '00:00:00', '00:00:00');

select * from users;
select * from kids;
select * from guardians;