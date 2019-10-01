package com.AskMe.rest;

import javax.servlet.http.HttpServlet;
import javax.servlet.*;

import org.springframework.web.context.support.SpringBeanAutowiringSupport;
import org.springframework.stereotype.Controller;
import org.springframework.http.MediaType;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.Collection;
import java.util.ArrayList;


import com.AskMe.dao.*;
import com.AskMe.model.*;

@Controller
@Path("/answer")
public class AnswerController extends HttpServlet{

    //@Autowired
    private AnswerService answerService = new AnswerService();

    public void init(ServletConfig config) {
        try{
            super.init(config);
            SpringBeanAutowiringSupport.processInjectionBasedOnServletContext(this, config.getServletContext());
        }catch(ServletException e){
        }
    }

    @POST //create
    public void postMsg(@QueryParam("questionId") int questionId, @QueryParam("answerText") String answerText) {
        answerService.createAnswer(questionId, answerText);
    }
    @PUT 
    public void putMsg(@QueryParam("questionId") int questionId, @QueryParam("answerText") String answerText){
        answerService.increaseVoteCount(questionId, answerText);
    }
}
