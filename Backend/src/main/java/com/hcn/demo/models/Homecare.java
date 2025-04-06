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
public class Homecare extends BaseFacility implements FacilityReference {

    @ManyToMany(mappedBy = "homecare")
    private List<MedicalFacility> medicalFacilities;

    public enum OwnershipType {
        PRIVATE, GOVERNMENT
    }
}
