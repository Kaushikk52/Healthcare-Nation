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
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalFacility{

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
    private String website;
    private String openDay;
    private String closeDay;
    private String hours;
    @Lob
    @Column(name = "description",columnDefinition = "TEXT")
    private String description;
    @ElementCollection
    @CollectionTable(name = "user_phone_numbers", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "phone_number")
    @Size(min = 1, message = "At least one phone number is required.")
    private List<String> phoneNumbers;
    @Column(name = "images", length = 5000, columnDefinition = "VARBINARY(5000)")
    private String[] images;
    @Column(name = "videos", length = 5000, columnDefinition = "VARBINARY(5000)")
    private String[] videos;

    @Enumerated(EnumType.STRING)
    private OwnershipType ownership;
    @Enumerated(EnumType.STRING)
    private FacilityType facilityType;
    private String[] brands;
    private String[] diagnostics;
    private String[] specialities;
    private String[] services;
    private String[] psu;
    private String[] accreditations;
    private String[] concerns;
    private String[] insurance;
    private String[] tpa;
    private String[] altMed;

    private Double avgRating;
    @OneToMany(mappedBy = "medicalFacility", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"hospital","user"})
    private List<Rating> ratings;
    @OneToMany(mappedBy = "medicalFacility", cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"hospital","user"})
    private List<Review> reviews;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


    public enum OwnershipType{
        PRIVATE,GOVERNMENT
    }

    public enum FacilityType{
        HOSPITAL,CLINIC
    }

    @PrePersist
    private void onCreate() {
        if (this.id == null) {
            this.id = UUID.randomUUID().toString();
        }
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    public void addRating(Rating rating){
        ratings.add(rating);
        rating.setMedicalFacility(this);
    }

    public void addReview(Review review){
        reviews.add(review);
        review.setMedicalFacility(this);
    }
}
