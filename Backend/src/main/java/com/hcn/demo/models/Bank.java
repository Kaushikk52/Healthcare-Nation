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
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIgnoreProperties(value = {"medicalFacilities"}, allowSetters = true)
public class Bank {

    @Id
    @Column(name = "user_id",nullable = false,updatable = false,length = 36)
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

    @Column(name = "images", length = 5000, columnDefinition = "VARBINARY(5000)")
    private String[] images;
    @Column(name = "videos", length = 5000, columnDefinition = "VARBINARY(5000)")
    private String[] videos;

    @Enumerated(EnumType.STRING)
    private OwnershipType ownership;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @ManyToMany
    @JoinTable(
            name = "bank_medical_facilities",
            joinColumns = @JoinColumn(name = "bank_id"),
            inverseJoinColumns = @JoinColumn(name = "medical_facility_id")
    )
    private List<MedicalFacility> medicalFacilities;

    @Column(name = "accreditations", columnDefinition = "TEXT")
    @Convert(converter = StringListConverter.class)
    private List<String> accreditations;

    @Column(name = "brands", columnDefinition = "TEXT")
    @Convert(converter = StringListConverter.class)
    private List<String> brands;


    public enum OwnershipType{
        PRIVATE,GOVERNMENT
    }

    @PrePersist
    private void onCreate() {
        if (this.id == null) {
            this.id = UUID.randomUUID().toString();
        }
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }


}
