package com.AskMe.dao;

import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.JdbcTemplate;

import com.AskMe.model.*;
import com.AskMe.database.*;

import java.util.Collection;
import java.util.ArrayList;

@Repository

public class QuestionDAO {

    private JdbcTemplate jdbcTemplate;

    public QuestionDAO() {
        this.jdbcTemplate = new JdbcTemplate(databaseConnection.getDataSource());
    }

    public Question getQuestion(int questionId)
    {
        AnswerDAO answerDAO = new AnswerDAO();
        String query = "SELECT * FROM questions WHERE questionId = ?";
        Question question = this.jdbcTemplate.queryForObject(query, new Object[] {questionId},
                (rs, rowNum) -> new Question(
                        rs.getInt("questionId"),
                        rs.getString("username"),
                        rs.getString("questionText"),
                        rs.getBoolean("closed"),
                        rs.getString("category"),
                        rs.getBoolean("featured"),
                        rs.getDate("dateCreated")));

        question.setAnswers(answerDAO.getAnswerByQuestionId(questionId));
        return question;
    }
    public Question getFeaturedQuestion()
    {
        String query = "SELECT * FROM questions WHERE featured = ?";
        int featured = 1;
        Question question = this.jdbcTemplate.queryForObject(query, new Object[]{featured},
                (rs, rowNum) -> new Question(
                        rs.getInt("questionId"),
                        rs.getString("username"),
                        rs.getString("questionText"),
                        rs.getBoolean("closed"),
                        rs.getString("category"),
                        rs.getBoolean("featured"),
                        rs.getDate("dateCreated")));
        return question;
    }

    public void setUnfeaturedQuestion(int questionId)
    {
        String query = "UPDATE questions set featured=? where questionId=?";
        this.jdbcTemplate.update(query, false, questionId);
    }

    public int getTotNumQuestInCat(String category)
    {
        int total = 0;
        String query = "SELECT COUNT(*) AS total FROM questions WHERE category = ?";
        total = this.jdbcTemplate.queryForObject(query, new Object[]{category},
            (rs,rowNum) -> new Integer(
                rs.getInt("total")));
        return total;
    }
    public Collection<Question> getQuestionsByUsername(String username)
    {
        Collection<Question> questions = new ArrayList<Question>();
        String query = "SELECT * FROM questions WHERE username = ?";
        this.jdbcTemplate.query(query, new Object[]{username},
                (rs, rowNum) -> new Question(
                        rs.getInt("questionId"),
                        rs.getString("username"),
                        rs.getString("questionText"),
                        rs.getBoolean("closed"),
                        rs.getString("category"),
                        rs.getBoolean("featured"),
                        rs.getDate("dateCreated"))).forEach(question -> questions.add(question));
        return questions;
    }

    public Collection<Question> getQuestionsByCategory(String category, int pageNumber)
    {
        Collection<Question> questions = new ArrayList<Question>();
        int lastItem = pageNumber * 10;
        int firstItem = (pageNumber - 1) * 10;
        String query = "SELECT * FROM questions WHERE category = ? ORDER BY dateCreated DESC LIMIT ?,?";
        this.jdbcTemplate.query(query, new Object[]{category, firstItem, lastItem},
                (rs, rowNum) -> new Question(
                        rs.getInt("questionId"),
                        rs.getString("username"),
                        rs.getString("questionText"),
                        rs.getBoolean("closed"),
                        rs.getString("category"),
                        rs.getBoolean("featured"),
                        rs.getDate("dateCreated"))).forEach(question -> questions.add(question));
        return questions;
    }

    public Question createQuestion(Question question)
    {
        String query = "INSERT into questions(username, questionText, closed, category, featured, dateCreated) values(?,?,?,?,?,?)";
        this.jdbcTemplate.update(query, question.getUsername(), question.getQuestionText(), question.getClosed(), question.getCategory(), question.getFeatured(), question.getDateCreated());
        return question;
    }

    public void setClosedQuestion(int questionId)
    {
        String query = "UPDATE questions set closed=? where questionId=?";
        this.jdbcTemplate.update(query, true, questionId);
    }

    public void setFeaturedQuestion(int questionId)
    {
        String query = "UPDATE questions set featured=? where questionId=?";
        this.jdbcTemplate.update(query, true, questionId);
    }

    public boolean deleteQuestion(int questionId)
    {
        String query = "DELETE from questions where questionId =?";
        boolean deleteSuccess = this.jdbcTemplate.update(query, questionId) > 0;
        return deleteSuccess;
    }
}
