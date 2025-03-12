package com.hcn.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hcn.demo.helper.StringListConverter;
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
//@JsonIgnoreProperties({"ratings","reviews"})
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

    @Column(name = "phoneNumbers")
    @Size(min = 1, message = "At least one phone number is required.")
    private String[] phoneNumbers;

    @Column(name = "facts", length = 5000, columnDefinition = "VARBINARY(5000)")
    private String[] facts;
    @Column(name = "achievements", length = 5000, columnDefinition = "VARBINARY(5000)")
    private String[] achievements;

    @Column(name = "images", length = 5000, columnDefinition = "VARBINARY(5000)")
    private String[] images;
    @Column(name = "videos", length = 5000, columnDefinition = "VARBINARY(5000)")
    private String[] videos;

    @Enumerated(EnumType.STRING)
    private OwnershipType ownership;
    @Enumerated(EnumType.STRING)
    private FacilityType facilityType;

    @Column(name = "brands", columnDefinition = "TEXT")
    @Convert(converter = StringListConverter.class)
    private List<String> brands;
    @Column(name = "diagnostics", columnDefinition = "TEXT")
    @Convert(converter = StringListConverter.class)
    private List<String> diagnostics;
    @Column(name = "specialities", columnDefinition = "TEXT")
    @Convert(converter = StringListConverter.class)
    private List<String> specialities;
    @Column(name = "services", columnDefinition = "TEXT")
    @Convert(converter = StringListConverter.class)
    private List<String> services;
    @Column(name = "psu", columnDefinition = "TEXT")
    @Convert(converter = StringListConverter.class)
    private List<String> psu;
    @Column(name = "accreditations", columnDefinition = "TEXT")
    @Convert(converter = StringListConverter.class)
    private List<String> accreditations;
    @Column(name = "concerns", columnDefinition = "TEXT")
    @Convert(converter = StringListConverter.class)
    private List<String> concerns;
    @Column(name = "insurance", columnDefinition = "TEXT")
    @Convert(converter = StringListConverter.class)
    private List<String> insurance;
    @Column(name = "tpa", columnDefinition = "TEXT")
    @Convert(converter = StringListConverter.class)
    private List<String> tpa;
    @Column(name = "altMed", columnDefinition = "TEXT")
    @Convert(converter = StringListConverter.class)
    private List<String> altMed;

    private Double avgRating;
    @OneToMany(mappedBy = "medicalFacility", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"hospital","user"})
    private List<Rating> ratings;
    @OneToMany(mappedBy = "medicalFacility", cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"hospital","user"})
    private List<Review> reviews;

    private Boolean isSaved;

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
