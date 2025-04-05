package com.hcn.demo.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Enquiry {

    @Id
    private String id;
    @Column(nullable = true)
    private String userId;
    private String name;
    private String phone;
    private String email;
    @Lob
    @Column(name = "content",columnDefinition = "TEXT")
    private String content;
    private LocalDateTime sentDate;

    @PrePersist
    private void prePersist(){
        if(this.id == null) {
            this.id = UUID.randomUUID().toString();
        }
        sentDate = LocalDateTime.now();
    }
}
