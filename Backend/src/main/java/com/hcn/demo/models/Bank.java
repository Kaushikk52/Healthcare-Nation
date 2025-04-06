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
@DiscriminatorValue("BANK")
public class Bank extends BaseFacility implements FacilityReference {

    @Column(name = "accreditations", columnDefinition = "TEXT")
    @Convert(converter = StringListConverter.class)
    private List<String> accreditations;

    @ManyToMany(mappedBy = "bank")
    private List<MedicalFacility> medicalFacilities;
}
