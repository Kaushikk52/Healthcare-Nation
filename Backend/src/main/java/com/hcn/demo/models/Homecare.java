package com.hcn.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hcn.demo.helper.StringListConverter;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties(value = {"medicalFacilities"}, allowSetters = true)
@DiscriminatorValue("HOMECARE")
public class Homecare extends BaseFacility implements FacilityReference {

    @ManyToMany
    @JoinTable(
            name = "homecare_medical_facilities",
            joinColumns = @JoinColumn(name = "homecare_id"),
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
