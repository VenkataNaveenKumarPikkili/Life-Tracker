package com.lifeplanner.auth.dto;

import lombok.*;

public class AuthResponses {
    @Data
    @AllArgsConstructor
    public static class Tokens {
        private String accessToken;
        private String refreshToken;
    }
}
