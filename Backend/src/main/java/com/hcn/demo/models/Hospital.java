package com.hcn.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
public class Hospital {

    @Id
    @Column(name = "id", nullable = false, updatable = false, length = 36)
    private String id;

    @NotNull(message = "Hospital name cannot be null")
    @Size(min = 3, max = 100, message = "Hospital name must be between 3 and 100 characters")
    @Column(nullable = false, length = 100)
    private String name;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;

    private int bed;

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

    private String[] departments;

    private String[] specialities;

    private String[] specialitiesImgs;

    private String[] altMed;

    private String[] concerns;

    private String[] services;

    private Double avgRating;

    @OneToMany(mappedBy = "hospital", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"hospital","user"})
    private List<Rating> ratings;

    @OneToMany(mappedBy = "hospital", cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"hospital","user"})
    private List<Review> reviews;

    @ManyToMany
    @JoinTable(
            name = "hospital_brand",
            joinColumns = @JoinColumn(name = "hospital_id"),
            inverseJoinColumns = @JoinColumn(name = "brand_id")
    )
    private List<Brands> brands;

    @Enumerated(EnumType.STRING)
    private HospitalType type;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;


    public enum HospitalType{
        PRIVATE,GOVERNMENT
    }

    @PrePersist
    private void onCreate() {
        if (this.id == null) {
            this.id = UUID.randomUUID().toString();
        }
        createdAt = LocalDateTime.now();
    }

    public void addRating(Rating rating){
        ratings.add(rating);
        rating.setHospital(this);
    }

    public void addReview(Review review){
        reviews.add(review);
        review.setHospital(this);
    }
}
