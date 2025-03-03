package com.hcn.demo.models;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "medical_facilities")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalFacility extends HealthcareFacility{

    @Enumerated(EnumType.STRING)
    private FacilityType facilityType; // HOSPITAL or CLINIC

    @ElementCollection
    @CollectionTable(name = "medical_specialities", joinColumns = @JoinColumn(name = "facility_id"))
    @Column(name = "speciality")
    private Set<String> specialities;  // Ex: Cardiology, Neurology

    @ElementCollection
    @CollectionTable(name = "medical_diagnostics", joinColumns = @JoinColumn(name = "facility_id"))
    @Column(name = "diagnostic_service")
    private Set<String> diagnosticServices; // Ex: MRI, CT Scan

    @ElementCollection
    @CollectionTable(name = "medical_alt_medicine", joinColumns = @JoinColumn(name = "facility_id"))
    @Column(name = "alt_medicine")
    private Set<String> alternativeMedicines; // Ex: Ayurveda, Homeopathy

    @ElementCollection
    @CollectionTable(name = "medical_schemes", joinColumns = @JoinColumn(name = "facility_id"))
    @Column(name = "scheme")
    private Set<String> publicSectorSchemes; // Ex: Ayushman Bharat, ESI (Only relevant for hospitals)

    @ElementCollection
    @CollectionTable(name = "medical_accreditations", joinColumns = @JoinColumn(name = "facility_id"))
    @Column(name = "accreditation")
    private Set<String> accreditations; // Ex: NABH, JCI

    @ElementCollection
    @CollectionTable(name = "medical_concerns", joinColumns = @JoinColumn(name = "facility_id"))
    @Column(name = "concern")
    private Set<String> concerns; // Ex: Hygiene issues, Staff behavior

    @ElementCollection
    @CollectionTable(name = "medical_insurances", joinColumns = @JoinColumn(name = "facility_id"))
    @Column(name = "insurance")
    private Set<String> acceptedInsurances; // Ex: Star Health, Max Bupa

    @ElementCollection
    @CollectionTable(name = "medical_tpas", joinColumns = @JoinColumn(name = "facility_id"))
    @Column(name = "tpa")
    private Set<String> thirdPartyAdministrators; // Ex: Medi Assist, Vidal Health

    @OneToMany(mappedBy = "medicalFacility", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"hospital","user"})
    private List<Rating> ratings;

    @OneToMany(mappedBy = "medicalFacility", cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"hospital","user"})
    private List<Review> reviews;

    private Double avgRating;

    public enum FacilityType {
        HOSPITAL,
        CLINIC
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
