package com.hcn.demo.models;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.UUID;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
public class Address {

    @Id
    @Column(name = "id", nullable = false, updatable = false, length = 36)
    private String id;

    private String street;
    private String city;
    private String landmark;
    private String state;
    private String zipCode;

    @PrePersist
    private void prePersist() {
        if (id == null) {
            id = UUID.randomUUID().toString();
        }
    }

}
