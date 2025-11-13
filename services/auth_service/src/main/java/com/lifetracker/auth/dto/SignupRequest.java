package com.lifetracker.auth.dto;

public class SignupRequest {
    private String email;
    private String password;
    private String name;

    public SignupRequest() {}

    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getName() { return name; }
}