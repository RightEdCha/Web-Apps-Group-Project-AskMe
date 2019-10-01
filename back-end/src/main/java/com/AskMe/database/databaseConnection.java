package com.AskMe.database;

import org.springframework.jdbc.datasource.DriverManagerDataSource;

public class databaseConnection {
    private static final String driverClassName = "com.mysql.jdbc.Driver";
    //private static final String url = "jdbc:mysql://localhost:3306/askme";
    private static final String url = "jdbc:mysql://us-cdbr-iron-east-01.cleardb.net:3306/heroku_0f5c44572c4e9ef";
    private static final String dbUsername = "b562a16523032f";
    private static final String dbPassword = "15333f99";

    public static DriverManagerDataSource getDataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName(driverClassName);
        dataSource.setUsername(dbUsername);
        dataSource.setPassword(dbPassword);
        dataSource.setUrl(url);

        return dataSource;
    }
}
