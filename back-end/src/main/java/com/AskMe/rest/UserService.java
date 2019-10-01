package com.AskMe.rest;

import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.ArrayList;


import com.AskMe.dao.*;
import com.AskMe.model.*;

public class UserService {
    private UserDAO userDAO = new UserDAO();

    public User getUser(String username, String password) {
        User user = userDAO.getUser(username, password);
        return user;
    }
    public void createUser(String username, String password, String fname, String lname, String email) {
        User user = new User(username, password, fname, lname, email, false);
        userDAO.createUser(user);
    }
    public void setUser(String username, String password, String fname, String lname, String email){
        User user = new User(username, password, fname, lname, email, false);
        userDAO.updateUser(user);
    }
    public void setAdmin(String username){
        userDAO.giveUserAdmin(username);
    }
    public String deleteUser(String username){
        String retString ="";
        boolean success = userDAO.deleteUser(username);
        if(success == true)
            return retString;
        return "failure";
    }
}
