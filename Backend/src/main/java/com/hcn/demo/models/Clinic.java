package com.hcn.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Clinic {

    @Id
    @Column(name = "id", nullable = false, updatable = false, length = 36)
    private String id;

    @NotNull(message = "Clinic name cannot be null")
    @Size(min = 3, max = 100, message = "Clinic name must be between 3 and 100 characters")
    @Column(nullable = false, length = 100)
    private String name;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;

    private String ownership;

    @Lob
    @Column(name = "description",columnDefinition = "TEXT")
    private String description;

    @NotNull(message = "Phone number cannot be null.")
    @Size(min = 10, max = 15, message = "Phone number must be between 10 and 15 digits.")
    @Column(name = "phone", nullable = false, unique = true, length = 15)
    private String phone;

    @Column(name = "images", length = 500)
    private String[] images;

    private String[] services;

    private Double avgRating;

    @OneToMany(mappedBy = "clinic", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"hospital","user"})
    private List<Rating> ratings;

    @OneToMany(mappedBy = "clinic", cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"hospital","user"})
    private List<Review> reviews;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    private void onCreate() {
        if (this.id == null) {
            this.id = UUID.randomUUID().toString();
        }
        createdAt = LocalDateTime.now();
    }

    public void addRating(Rating rating){
        ratings.add(rating);
    }

    public void addReview(Review review){
        reviews.add(review);
    }
}
