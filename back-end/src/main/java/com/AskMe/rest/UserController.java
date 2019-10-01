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
@Path("/user")
public class UserController extends HttpServlet{

    //@Autowired
    private UserService userService = new UserService();

    public void init(ServletConfig config) {
        try{
            super.init(config);
            SpringBeanAutowiringSupport.processInjectionBasedOnServletContext(this, config.getServletContext());
        }catch(ServletException e){
        }
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON_VALUE)
    public User getMsg(@QueryParam("username") String username, @QueryParam("password") String password){
        User user =  userService.getUser(username, password);
        return user;
    }


    @POST //create
    public void postMsg(@QueryParam("username") String username, @QueryParam("password") String password, @QueryParam("fname") String fname, @QueryParam("lname") String lname, @QueryParam("email") String email) {
        userService.createUser(username, password, fname, lname, email);
    }

    @PUT
    @Path("/userUpdate/")
    public void putMsg1(@QueryParam("username") String username, @QueryParam("password") String password, @QueryParam("fname") String fname, @QueryParam("lname") String lname, @QueryParam("email") String email) {
        userService.setUser(username, password, fname, lname, email);
    }

    @PUT
    @Path("/giveAdmin/{username}") //For this request we are going to have to make a request to check for admin, by making a getuser request
    public void putMsg2(@PathParam("username") String username) {
        userService.setAdmin(username);
    }

    @DELETE
    public Response deleteMsg(@QueryParam("username") String username) {
        String output = userService.deleteUser(username);
        return Response.status(200).entity(output).build();
    }


}
