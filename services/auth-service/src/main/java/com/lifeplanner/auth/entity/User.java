
package com.lifeplanner.auth.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "users")   // IMPORTANT: don't use "user" reserved keyword
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue
    private UUID id;

    private String name;

    @Column(unique = true)
    private String email;

    // map to DB column password_hash if the DB uses that name
    @Column(name = "password_hash", nullable = false)
    private String password;
}
