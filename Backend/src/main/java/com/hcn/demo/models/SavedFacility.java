package com.hcn.demo.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class SavedFacility {

    @Id
    @Column(name = "id",nullable = false,updatable = false,length = 36)
    private String id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "hospital_id", nullable = false)
    private MedicalFacility hospital;

    @Column(nullable = false)
    private LocalDateTime savedAt;

    @PrePersist
    private void prePersist() {
        if (this.id == null) {
            this.id = UUID.randomUUID().toString();
        }
       this.savedAt = LocalDateTime.now();
    }

}
