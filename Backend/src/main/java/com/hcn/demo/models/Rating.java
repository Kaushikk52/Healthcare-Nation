package com.hcn.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@JsonIgnoreProperties({"medicalFacility"})
public class Rating {

    @Id
    @Column(name = "id", nullable = false, updatable = false, length = 36)
    private String id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "facility_id", nullable = true)
    private MedicalFacility medicalFacility;

    private int rating;

    private LocalDateTime createdAt;

    @PrePersist
    public void prePersis() {
        if (this.id == null) {
            this.id = UUID.randomUUID().toString();
        }
    }
}
