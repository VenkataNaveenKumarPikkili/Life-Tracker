package com.lifetracker.auth.controller;

import com.lifetracker.auth.model.User;
import com.lifetracker.auth.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // ============================
    // REGISTER API
    // ============================
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> request) {

        try {
            String email = request.get("email");
            String password = request.get("password");

            User user = authService.register(email, password);

            return ResponseEntity.ok(
                Map.of(
                    "id", user.getId(),
                    "email", user.getEmail()
                )
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // ============================
    // LOGIN API
    // ============================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {

        try {
            String email = request.get("email");
            String password = request.get("password");

            String token = authService.login(email, password);

            return ResponseEntity.ok(
                Map.of(
                    "email", email,
                    "token", token
                )
            );

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid credentials"));
        }
    }

    // ============================
    // HEALTH CHECK
    // ============================
    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("service", "auth", "status", "ok");
    }
}
