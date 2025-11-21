package com.lifeplanner.auth.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.UUID;

@Component
public class JwtUtils {

    private final SecretKey key;
    private final long accessTokenMillis = 1000L * 60 * 60 * 24; // 1 day

    public JwtUtils(@Value("${jwt.secret}") String secret) {

        SecretKey generatedKey;

        if (secret == null || secret.isEmpty()) {
            // no secret provided → generate a safe one
            generatedKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
        } else {
            try {
                // Try base64 decode first
                byte[] decoded = Decoders.BASE64.decode(secret);
                generatedKey = Keys.hmacShaKeyFor(decoded);
            } catch (Exception e) {
                // If secret is not base64, fallback to raw bytes
                generatedKey = Keys.hmacShaKeyFor(secret.getBytes());
            }
        }

        this.key = generatedKey;
    }

    public String generateAccessToken(UUID userId, String email) {
        long now = System.currentTimeMillis();

        return Jwts.builder()
                .setSubject(userId.toString())
                .claim("email", email)
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + accessTokenMillis))
                .signWith(key)
                .compact();
    }

    public Jws<Claims> parseAccessToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);
    }
}
