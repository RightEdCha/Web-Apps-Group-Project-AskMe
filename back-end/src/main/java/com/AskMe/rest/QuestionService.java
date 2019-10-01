package com.AskMe.rest;

import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.ArrayList;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.text.DateFormat;


import com.AskMe.dao.*;
import com.AskMe.model.*;

@Service
public class QuestionService {

    private QuestionDAO questionDAO = new QuestionDAO();

    public Question getQuestion(int questionId) {
        Question question = questionDAO.getQuestion(questionId);
        return question;
    }

    public Question getFeaturedQuestion(){
        Question question = questionDAO.getFeaturedQuestion();
        return question;
    }

    public Collection<Question> getQuestionsByCategory(String category, int pageNumber) {
        Collection<Question> questions = new ArrayList<Question>();
        questions = questionDAO.getQuestionsByCategory(category, pageNumber);
        return questions;
    }

    public Collection<Question> getQuestionsByUser(String username) {
        Collection<Question> questions = new ArrayList<Question>();
        questions = questionDAO.getQuestionsByUsername(username);
        return questions;

    }

    public int getTotNumQuestInCat(String category) {
        int total = questionDAO.getTotNumQuestInCat(category);
        return total;
    }

    public void createQuestion(String category, String username, String questionText, int numAnswer, String answerText1, String answerText2, String answerText3, String answerText4) {
        DateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
        Date date = new Date();
        dateFormat.format(date);
        Question question = new Question(0,username, questionText, false, category, false, date);
        questionDAO.createQuestion(question);

        Collection<Question> questions = new ArrayList<Question>();
        questions = questionDAO.getQuestionsByUsername(username);
        int mostRecentQuestionId = 0;
        for (Question q : questions)
        {
            if(q.getQuestionId() > mostRecentQuestionId)
                mostRecentQuestionId = q.getQuestionId();
        }
        AnswerDAO answerDAO = new AnswerDAO();
        String[] answerTextArray = {answerText1, answerText2, answerText3, answerText4};
        for(int i = 0; i < numAnswer; i++)
        {
            Answer answer = new Answer(mostRecentQuestionId, answerTextArray[i], 0);
            answerDAO.createAnswer(answer);
        }
    }

    public void setFeatured(int questionId) {
        questionDAO.setFeaturedQuestion(questionId);
    }

    public void setUnfeatured(int questionId) {
        questionDAO.setUnfeaturedQuestion(questionId);
    }

    public void setClosed(int questionId) {
        questionDAO.setClosedQuestion(questionId);
    }

    public String deleteQuestion(int questionId) {
        String retString = "";
        boolean success = questionDAO.deleteQuestion(questionId);

        if (success == true)
            return retString;
        return "failure";
    }

}
