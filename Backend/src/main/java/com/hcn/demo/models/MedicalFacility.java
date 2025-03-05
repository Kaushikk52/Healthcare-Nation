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

    @Lob
    @Column(name = "description",columnDefinition = "TEXT")
    private String description;

    @NotNull(message = "Phone number cannot be null.")
    @Size(min = 10, max = 15, message = "Phone number must be between 10 and 15 digits.")
    @Column(name = "phone", nullable = false, unique = true, length = 15)
    private String phone;

    @Column(name = "images", length = 5000, columnDefinition = "VARBINARY(5000)")
    private String[] images;

    private String[] departments;

    @OneToMany(mappedBy = "medicalFacility", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Speciality> specialities;

    private String[] altMed;

    private String[] concerns;

    private String[] services;

    private Double avgRating;

    @OneToMany(mappedBy = "medicalFacility", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"hospital","user"})
    private List<Rating> ratings;

    @OneToMany(mappedBy = "medicalFacility", cascade = CascadeType.ALL)
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
    private HospitalType ownership;

    @Enumerated(EnumType.STRING)
    private FacilityType facilityType;

    private String openDay;
    private String closeDay;
    private String hours;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;


    public enum HospitalType{
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
