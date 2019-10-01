package com.AskMe.dao;

import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.JdbcTemplate;

import com.AskMe.model.*;
import com.AskMe.database.*;

@Repository
public class UserDAO {

    private JdbcTemplate jdbcTemplate;

    public UserDAO() {
        this.jdbcTemplate = new JdbcTemplate(databaseConnection.getDataSource());
    }

    public User getUser(String username, String password)
    {
        String query = "SELECT * FROM users WHERE username=? AND password=?";
        User user = this.jdbcTemplate.queryForObject(query, new Object[] {username,password},
                (rs, rowNum) -> new User(
                        rs.getString("username"),
                        rs.getString("password"),
                        rs.getString("fname"),
                        rs.getString("lname"),
                        rs.getString("email"),
                        rs.getBoolean("admin")));
        return user;
    }

    public User createUser(User user){
        String query = "INSERT into users(username, password, fname, lname, email) values(?,?,?,?,?)";
        this.jdbcTemplate.update(query, user.getUsername(), user.getPassword(), user.getFname(), user.getLname(), user.getEmail());
        return user;
    }

    public User updateUser(User user){
        String query = "UPDATE users set password = ?, fname = ?, lname = ?, email = ? where username = ?";
        this.jdbcTemplate.update(query, user.getPassword(), user.getFname(), user.getLname(), user.getEmail(), user.getUsername());
        return user;
    }

    public String giveUserAdmin(String username) {
        String query = "UPDATE users set admin = ? where username = ?";
        this.jdbcTemplate.update(query, true, username);
        return username;
    }

    public boolean deleteUser(String username) {
        String query = "DELETE from users where username =?";
        boolean deleteSuccess = this.jdbcTemplate.update(query, username) > 0;
        return deleteSuccess;
    }
}
