package com.lifetracker.auth.dto;

public class UserResponse {
    private String userId;
    private String email;
    private String name;

    public UserResponse() {}
    public UserResponse(String userId, String email, String name) {
        this.userId = userId;
        this.email = email;
        this.name = name;
    }

    public String getUserId() { return userId; }
    public String getEmail() { return email; }
    public String getName() { return name; }
}