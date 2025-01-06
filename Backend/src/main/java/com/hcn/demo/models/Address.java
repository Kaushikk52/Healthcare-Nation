package com.hcn.demo.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import lombok.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Address {

    @Id
    @Column(name = "id", nullable = false, updatable = false, length = 36)
    private String id;

    private String street;
    private String locality;
    private String landmark;
    private String zipCode;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    private void prePersist(){
        if(this.id == null){
            this.id = UUID.randomUUID().toString();
        }
        createdAt = LocalDateTime.now();
    }


}
