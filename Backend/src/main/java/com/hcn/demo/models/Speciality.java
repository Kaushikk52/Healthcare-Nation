package com.hcn.demo.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Speciality {

    @Id
    @Column(name = "id", nullable = false, updatable = false, length = 36)
    private String id;

    private String name;

    @ManyToMany(mappedBy = "specialities")
    private List<Hospital> hospitals;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    private void onCreate() {
        if (this.id == null) {
            this.id = UUID.randomUUID().toString();
        }
        createdAt = LocalDateTime.now();
    }
}
