package com.lifeplanner.auth.dto;

import lombok.*;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class AuthRequests {

    @Data
    public static class Signup {
        @Email
        @NotBlank
        private String email;
        @NotBlank
        private String password;
        private String name;
    }

    @Data
    public static class Login {
        @Email
        @NotBlank
        private String email;
        @NotBlank
        private String password;
    }
}
