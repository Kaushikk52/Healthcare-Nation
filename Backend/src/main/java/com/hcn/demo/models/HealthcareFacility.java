package com.hcn.demo.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
public abstract class HealthcareFacility {

    @NotNull(message = "Healthcare Facility name cannot be null")
    @Size(min = 3, max = 100, message = "Healthcare Facility name must be between 3 and 100 characters")
    @Column(nullable = false, length = 100)
    private String name;

    @NotNull(message = "Phone number cannot be null.")
    @Size(min = 10, max = 15, message = "Phone number must be between 10 and 15 digits.")
    @Column(name = "phone", nullable = false, unique = true, length = 15)
    private String[] phone;

    @Column(name = "images", length = 5000, columnDefinition = "VARBINARY(5000)")
    private String[] images;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id", nullable = false)
    private Address address;

    private String website;

    private int bed;

    private String ownership; // Private or Government

    @Lob
    @Column(name = "description",columnDefinition = "TEXT")
    private String description;

    @ElementCollection
    @CollectionTable(name = "brands", joinColumns = @JoinColumn(name = "facility_id"))
    @Column(name = "brand")
    private Set<String> brands;

    private String openDay;
    private String closeDay;
    private String hours;

    @PastOrPresent(message = "Creation date must be in the past or present")
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private LocalDateTime createdAt;

    @PastOrPresent(message = "Update date must be in the past or present")
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = true)
    private LocalDateTime updatedAt;

    private boolean isActive;

}
