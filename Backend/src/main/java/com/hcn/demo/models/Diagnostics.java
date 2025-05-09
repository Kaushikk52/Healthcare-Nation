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
@DiscriminatorValue("DIAGNOSTIC")
public class Diagnostics extends BaseFacility implements FacilityReference {

    @Column(name = "accreditations", columnDefinition = "TEXT")
    @Convert(converter = StringListConverter.class)
    private List<String> accreditations;

    @Column(name = "diagnostics", columnDefinition = "TEXT")
    @Convert(converter = StringListConverter.class)
    private List<String> diagnostics;

    @Column(name = "psu", columnDefinition = "TEXT")
    @Convert(converter = StringListConverter.class)
    private List<String> psu;

    @Column(name = "insurance", columnDefinition = "TEXT")
    @Convert(converter = StringListConverter.class)
    private List<String> insurance;

    @Column(name = "tpa", columnDefinition = "TEXT")
    @Convert(converter = StringListConverter.class)
    private List<String> tpa;

    @ManyToMany
    @JoinTable(
            name = "diagnostics_medical_facilities",
            joinColumns = @JoinColumn(name = "diagnostic_id"),
            inverseJoinColumns = @JoinColumn(name = "medical_facility_id")
    )
    private List<MedicalFacility> medicalFacilities;
}