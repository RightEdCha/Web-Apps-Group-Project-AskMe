/*
The following is an example of a "Stored Procedure"
*/

INSERT INTO users (username, password, fname, lname, email, admin) VALUES ("admin", "admin", "adminTest", "Testadmin", "admin@gmail.com",1);
INSERT INTO users (username, password, fname, lname, email, admin) VALUES ("test", "testpass", "test", "user", "test@gmail.com",0);
INSERT INTO users (username, password, fname, lname, email, admin) VALUES ("test2", "test2pass", "test2", "user2", "test2@gmail.com",0);

SELECT * FROM users;

DROP PROCEDURE IF EXISTS insertQuestions;
DROP PROCEDURE IF EXISTS insertAnswers;

DELIMITER //
CREATE PROCEDURE insertQuestions
(IN numQuestions INT)

BEGIN
 DECLARE x INT;
 DECLARE username1, questionText1, category1 VARCHAR(255);
 DECLARE closed1, featured1 BOOLEAN;
 DECLARE dateCreated1 TIMESTAMP;

 SET x = 1;

 WHILE x  <= numQuestions DO

	 SET username1 = ELT(MOD(x,2)+1, "test", "test2");
	 SET questionText1 = ELT(MOD(x,4)+1, "What sports do you like?","What actor do you hate?", "What TV show do you watch?", "A test question");
	 SET category1 = ELT(MOD(x,3)+1, "Sports", "Entertainment", "Entertainment", "Science");
	 SET closed1 = ELT(MOD(x,2)+1, 1, 0);
	 SET featured1 = ELT(MOD(x,4)+1,0,0,0,1);
	 SET dateCreated1 = ELT(MOD(x,4)+1, 20181126100700,20181127100700,20181126112722,20181126112710);

	 INSERT INTO questions (username, questionText, closed, category, featured, dateCreated)
		VALUES (username1, questionText1, closed1, category1, featured1, dateCreated1);

	 SET  x = x + 1; 

 END WHILE;
 SELECT * FROM questions;
 
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE insertAnswers
(IN numAnswers INT)

BEGIN
 DECLARE x, questionId1, voteCount1 INT;
 DECLARE answerText1 VARCHAR(255);

 SET x = 1;

 WHILE x  <= numAnswers DO
	 SET answerText1 = ELT(MOD(x,4) + 1, "Answer1", "Answer2", "Answer3", "Answer4");
	 SET questionId1 = ELT((x/4), 1, 2, 3, 4 );
	 SET voteCount1 = ELT(MOD(x,4)+1, 1, 2, 3, 4);

	 INSERT INTO answers (questionId, answerText, voteCount)
		VALUES (questionId1, answerText1, voteCount1);

	 SET  x = x + 1;

 END WHILE;
 SELECT * FROM answers;

END //
DELIMITER ;

CALL insertQuestions(4);
CALL insertAnswers(16);