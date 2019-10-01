package com.AskMe.rest;

import javax.servlet.http.HttpServlet;
import javax.servlet.*;

import org.springframework.web.context.support.SpringBeanAutowiringSupport;
import org.springframework.stereotype.Controller;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.Collection;
import java.util.ArrayList;


import com.AskMe.dao.*;
import com.AskMe.model.*;

@CrossOrigin("https://thoushaltbesmitten.herokuapp.com")
@Controller
@Path("/question")
public class QuestionController extends HttpServlet{

    //@Autowired
    private QuestionService questionService = new QuestionService();

    public void init(ServletConfig config) {
        try{
            super.init(config);
            SpringBeanAutowiringSupport.processInjectionBasedOnServletContext(this, config.getServletContext());
        }catch(ServletException e){
        }
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON_VALUE)
    @Path("/{questionId}")
    public Question getMsg(@PathParam("questionId") int questionId){
       Question question =  questionService.getQuestion(questionId);
       return question;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON_VALUE)
    @Path("/featured")
    public Question getMsg1(){
       Question question = questionService.getFeaturedQuestion();
       return question;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON_VALUE)
    @Path("totalitems")
    public int getMsg4(@QueryParam("category") String category){
        int totalItems = questionService.getTotNumQuestInCat(category);
        return totalItems;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON_VALUE)
    @Path("category")
    public Collection<Question> getMsg2(@QueryParam("category") String category,@QueryParam("pagenumber") int pageNumber){
        Collection<Question> questions = new ArrayList<Question>();
        questions = questionService.getQuestionsByCategory(category, pageNumber);
        return questions;
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON_VALUE)
    @Path("user/{username}")
    public Collection<Question> getMsg3(@PathParam("username") String username){
        Collection<Question> questions = new ArrayList<Question>();
        questions = questionService.getQuestionsByUser(username);
        return questions;
    }

    @POST //create
    public void postMsg(@QueryParam("category") String category, @QueryParam("username") String username, @QueryParam("questionText") String questionText, @QueryParam("numAnswers") int numAnswers, @QueryParam("answerText1") String answerText1, @QueryParam("answerText2") String answerText2, @QueryParam("answerText3") String answerText3, @QueryParam("answerText4") String answerText4) {
        questionService.createQuestion(category, username, questionText, numAnswers, answerText1, answerText2, answerText3, answerText4);
    }

    @PUT
    @Path("/unfeature/{questionId}")
    public void unfeatureMsg(@PathParam("questionId") int questionId) {
        questionService.setUnfeatured(questionId);
    }

    @PUT //Need to add a function to set the current featured question to be set as not featured
    @Path("/featured/{questionId}")
    public void featuredMsg(@PathParam("questionId") int questionId) {
        questionService.setFeatured(questionId);
    }

    @PUT
    @Path("/closed/{questionId}")
    public void closedMsg(@PathParam("questionId") int questionId) {
        questionService.setClosed(questionId);
    }

    @DELETE
    public Response deleteMsg(@QueryParam("questionId") int questionId) {

        String output = questionService.deleteQuestion(questionId);
        return Response.status(200).entity(output).build();
    }


}
