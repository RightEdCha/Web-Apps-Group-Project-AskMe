SHOW TABLES;
DROP TABLE IF EXISTS cartitems, cartusers, customers, products;
DROP TABLE IF EXISTS users, questions, answers;
SHOW TABLES;

CREATE TABLE users(id SERIAL, username VARCHAR(10), password VARCHAR(18), fname VARCHAR(255), lname VARCHAR(255),
		email VARCHAR(255), admin BOOLEAN, UNIQUE(id), UNIQUE(username));

CREATE TABLE questions(questionId SERIAL NOT NULL, username VARCHAR(10), questionText VARCHAR(255), closed BOOLEAN, category VARCHAR(255), featured BOOLEAN, dateCreated TIMESTAMP, PRIMARY KEY (questionId));
CREATE TABLE answers(questionId BIGINT UNSIGNED, answerText VARCHAR(255), voteCount INT, FOREIGN KEY (questionId) REFERENCES questions(questionId) ON DELETE CASCADE);

SHOW TABLES;