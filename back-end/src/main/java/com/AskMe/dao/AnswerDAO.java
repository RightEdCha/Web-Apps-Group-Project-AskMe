package com.AskMe.dao;

import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.JdbcTemplate;

import com.AskMe.model.*;
import com.AskMe.database.*;

import java.util.Collection;
import java.util.ArrayList;

public class AnswerDAO {
    private JdbcTemplate jdbcTemplate;

    public AnswerDAO() {
        this.jdbcTemplate = new JdbcTemplate(databaseConnection.getDataSource());
    }

    public Collection<Answer> getAnswerByQuestionId(int questionId)
    {
        Collection<Answer> answers = new ArrayList<Answer>();
        String query = "SELECT * FROM answers WHERE questionId = ?";
        this.jdbcTemplate.query(query, new Object[] { questionId },
                (rs, rowNum) -> new Answer(
                    rs.getInt("questionId"),
                    rs.getString("answerText"),
                    rs.getInt("voteCount"))).forEach(answer -> answers.add(answer));

        return answers;
    }
    public Answer createAnswer(Answer answer)
    {
        String query = "INSERT into answers(questionId, answerText, voteCount) values(?,?,?)";
        this.jdbcTemplate.update(query, answer.getQuestionId(), answer.getAnswerText(), answer.getVoteCount());
        return answer;
    }

    public void increaseVoteCount(int questionId, String answerText)
    {
        String query = "UPDATE answers set voteCount=voteCount+1 where questionId=? AND answerText=?";
        this.jdbcTemplate.update(query, questionId, answerText);
    }

}
