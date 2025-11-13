package com.lifetracker.auth.service;

import com.lifetracker.auth.dto.LoginRequest;
import com.lifetracker.auth.dto.SignupRequest;
import com.lifetracker.auth.model.User;
import com.lifetracker.auth.repository.UserRepository;
import com.lifetracker.auth.security.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder encoder;

    public UserService(UserRepository userRepository, JwtUtil jwtUtil, BCryptPasswordEncoder encoder) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.encoder = encoder;
    }

    // Returns JWT token
    public String signup(SignupRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setUserId(UUID.randomUUID());
        user.setEmail(req.getEmail());
        user.setName(req.getName());
        user.setPasswordHash(encoder.encode(req.getPassword()));

        User saved = userRepository.save(user);

        return jwtUtil.generateToken(saved.getUserId().toString(), saved.getEmail(), saved.getName());
    }

    // Returns JWT token
    public String login(LoginRequest req) {
        var user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!encoder.matches(req.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid email or password");
        }

        return jwtUtil.generateToken(user.getUserId().toString(), user.getEmail(), user.getName());
    }

    public User getUserById(java.util.UUID userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}