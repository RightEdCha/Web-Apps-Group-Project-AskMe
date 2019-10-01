package com.AskMe.model;
import java.util.*;

public class Question {
    private int questionId;
    private boolean closed, featured;
    private String username,questionText,category;
    private Date dateCreated;
    private Collection<Answer> answers;

    public Question(int questionId, String username, String questionText, boolean closed, String category, boolean featured, Date dateCreated)
    {
        this.questionId = questionId;
        this.username = username;
        this.questionText = questionText;
        this.closed = closed;
        this.category = category;
        this.featured = featured;
        this.dateCreated = dateCreated;
    }

    public int getQuestionId() {
        return questionId;
    }

    public void setQuestionId(int questionId) {
        this.questionId = questionId;
    }

    public boolean getClosed() {
        return closed;
    }

    public void setClosed(boolean closed) {
        this.closed = closed;
    }

    public boolean getFeatured() {
        return featured;
    }

    public void setFeatured(boolean featured) {
        this.featured = featured;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Collection<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(Collection<Answer> answers) {
        this.answers = answers;
    }
}
