package com.AskMe.model;

public class Answer {
    int questionId, voteCount;
    String answerText;

    public Answer(int questionId, String answerText, int voteCount)
    {
        this.questionId = questionId;
        this.answerText = answerText;
        this.voteCount = voteCount;
    }

    public int getQuestionId() {
        return questionId;
    }

    public void setQuestionId(int questionId) {
        this.questionId = questionId;
    }

    public int getVoteCount() {
        return voteCount;
    }

    public void setVoteCount(int voteCount) {
        this.voteCount = voteCount;
    }

    public String getAnswerText() {
        return answerText;
    }

    public void setAnswerText(String answerText) {
        this.answerText = answerText;
    }
}
