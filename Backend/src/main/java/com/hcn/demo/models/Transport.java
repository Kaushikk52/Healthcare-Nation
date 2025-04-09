package com.hcn.demo.models;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIgnoreProperties(value = {"medicalFacilities"}, allowSetters = true)
@DiscriminatorValue("TRANSPORT")
public class Transport extends BaseFacility implements FacilityReference{

    @ManyToMany
    @JoinTable(
            name = "transport_medical_facilities",
            joinColumns = @JoinColumn(name = "transport_id"),
            inverseJoinColumns = @JoinColumn(name = "medical_facility_id")
    )
    private List<MedicalFacility> medicalFacilities;

}
