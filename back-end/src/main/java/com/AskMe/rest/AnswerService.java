package com.AskMe.rest;

import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.ArrayList;


import com.AskMe.dao.*;
import com.AskMe.model.*;

public class AnswerService {
    private AnswerDAO answerDAO = new AnswerDAO();

    public void createAnswer(int questionId, String answerText) {
        Answer answer = new Answer(questionId, answerText, 0);
        answerDAO.createAnswer(answer);
    }
    public void increaseVoteCount(int questionId, String answerText) {
        answerDAO.increaseVoteCount(questionId, answerText);
    }
}
