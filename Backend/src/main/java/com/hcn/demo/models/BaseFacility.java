package com.hcn.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.hcn.demo.helper.StringListConverter;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.util.ArrayList;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "facilities")
@DiscriminatorColumn(name = "dtype")
public abstract class BaseFacility extends Auditable {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name = "id", nullable = false, updatable = false, length = 36)
    private String id;

    @NotNull(message = "Name cannot be null")
    @Size(min = 3, max = 100, message = "Name must be between 3 and 100 characters")
    @Column(nullable = false, length = 100)
    private String name;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address address;

    private String website;
    private String openDay;
    private String closeDay;
    private String fromTime;
    private String toTime;

    @Lob
    @Column(name = "description",columnDefinition = "TEXT")
    private String description;

    @ElementCollection
    @CollectionTable(name = "facility_phone_numbers", joinColumns = @JoinColumn(name = "facility_id"))
    @Column(name = "phone_number")
    private List<String> phoneNumbers;

    @ElementCollection
    @CollectionTable(name = "facility_facts", joinColumns = @JoinColumn(name = "facility_id"))
    private List<String> facts;

    @ElementCollection
    @CollectionTable(name = "facility_achievements", joinColumns = @JoinColumn(name = "facility_id"))
    private List<String> achievements;

    @ElementCollection
    @CollectionTable(name = "facility_images", joinColumns = @JoinColumn(name = "facility_id"))
    private List<String> images;

    @ElementCollection
    @CollectionTable(name = "facility_videos", joinColumns = @JoinColumn(name = "facility_id"))
    private List<String> videos;

    @Enumerated(EnumType.STRING)
    private OwnershipType ownership;

    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "TEXT")
    private List<String> brands;

    private Double avgRating;
    @OneToMany(mappedBy = "facility", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"facility", "user"})
    private List<Rating> ratings= new ArrayList<>();

    @OneToMany(mappedBy = "facility", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"facility", "user"})
    private List<Review> reviews= new ArrayList<>();

    private Boolean isSaved;

    public void addRating(Rating rating) {
        if (this.ratings == null) {
            this.ratings = new ArrayList<>();
        }
        this.ratings.add(rating);
        rating.setFacility(this);
    }

    public void addReview(Review review) {
        if (this.reviews == null) {
            this.reviews = new ArrayList<>();
        }
        this.reviews.add(review);
        review.setFacility(this);
    }

    @Enumerated(EnumType.STRING)
    private FacilityType facilityType;

    public enum FacilityType{
        hospitals,clinics
    }

    public enum OwnershipType {
        PRIVATE, GOVERNMENT
    }


}
