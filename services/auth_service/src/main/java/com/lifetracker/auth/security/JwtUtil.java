package com.lifetracker.auth.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    // NOTE: For prod read from env/config and use a properly sized key.
    private final String secret = "MY_SUPER_SECRET_KEY_12345678901234567890"; // 32+ chars
    private final long expiration = 24 * 60 * 60 * 1000L; // 1 day

    public String generateToken(String userId, String email, String name) {
        return Jwts.builder()
                .setSubject(userId)
                .claim("email", email)
                .claim("name", name)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUserId(String token) {
        return getClaims(token).getSubject();
    }

    public String extractEmail(String token) {
        return getClaims(token).get("email", String.class);
    }

    public String extractName(String token) {
        return getClaims(token).get("name", String.class);
    }

    public Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secret.getBytes(StandardCharsets.UTF_8))
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}