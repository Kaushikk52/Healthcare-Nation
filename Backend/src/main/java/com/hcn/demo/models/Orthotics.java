package com.hcn.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.hcn.demo.helper.StringListConverter;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIgnoreProperties(value = {"medicalFacilities"}, allowSetters = true)
@DiscriminatorValue("ORTHOTICS")
public class Orthotics extends BaseFacility implements FacilityReference{

    @ManyToMany
    @JoinTable(
            name = "orthotics_medical_facilities",
            joinColumns = @JoinColumn(name = "orthotic_id"),
            inverseJoinColumns = @JoinColumn(name = "medical_facility_id")
    )
    private List<MedicalFacility> medicalFacilities;

    @OneToMany(mappedBy = "facility", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"facility", "user"})
    private List<Rating> ratings;

    @OneToMany(mappedBy = "facility", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"facility", "user"})
    private List<Review> reviews;

    public void addRating(Rating rating) {
        this.ratings.add(rating);
        rating.setFacility(this);
    }

    public void addReview(Review review) {
        this.reviews.add(review);
        review.setFacility(this);
    }

}
