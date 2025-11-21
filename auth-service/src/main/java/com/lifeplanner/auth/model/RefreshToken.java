package com.lifeplanner.auth.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class RefreshToken {

    @Id
    private java.util.UUID id;

    private java.util.UUID userId;
}
