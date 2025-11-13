package com.lifetracker.auth.controller;

import com.lifetracker.auth.dto.LoginRequest;
import com.lifetracker.auth.dto.SignupRequest;
import com.lifetracker.auth.dto.TokenResponse;
import com.lifetracker.auth.dto.UserResponse;
import com.lifetracker.auth.security.JwtUtil;
import com.lifetracker.auth.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/signup")
    public TokenResponse signup(@RequestBody SignupRequest req) {
        String token = userService.signup(req);
        return new TokenResponse(token);
    }

    @PostMapping("/login")
    public TokenResponse login(@RequestBody LoginRequest req) {
        String token = userService.login(req);
        return new TokenResponse(token);
    }

    @GetMapping("/me")
    public UserResponse me(@RequestHeader("Authorization") String header) {
        String token = header.replace("Bearer ", "");
        // extract userId string then convert to UUID
        String userIdString = jwtUtil.extractUserId(token);
        UUID userId = UUID.fromString(userIdString);
        var user = userService.getUserById(userId);
        return new UserResponse(user.getUserId().toString(), user.getEmail(), user.getName());
    }

    @GetMapping("/health")
    public String health() {
        return "{\"status\": \"ok\"}";
    }
}