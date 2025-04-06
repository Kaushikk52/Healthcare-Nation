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
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties(value = {"medicalFacilities"}, allowSetters = true)
@DiscriminatorValue("CENTER")
public class Center extends BaseFacility implements FacilityReference{

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Enumerated(EnumType.STRING)
    private CenterType type;

    @Column(name = "diagnostics", columnDefinition = "TEXT")
    @Convert(converter = StringListConverter.class)
    private List<String> diagnostics;
    @Column(name = "specialities", columnDefinition = "TEXT")
    @Convert(converter = StringListConverter.class)
    private List<String> specialities;
    @Column(name = "services", columnDefinition = "TEXT")
    @Convert(converter = StringListConverter.class)
    private List<String> services;
    @Column(name = "psu", columnDefinition = "TEXT")
    @Convert(converter = StringListConverter.class)
    private List<String> psu;
    @Column(name = "accreditations", columnDefinition = "TEXT")
    @Convert(converter = StringListConverter.class)
    private List<String> accreditations;
    @Column(name = "concerns", columnDefinition = "TEXT")
    @Convert(converter = StringListConverter.class)
    private List<String> concerns;
    @Column(name = "insurance", columnDefinition = "TEXT")
    @Convert(converter = StringListConverter.class)
    private List<String> insurance;
    @Column(name = "tpa", columnDefinition = "TEXT")
    @Convert(converter = StringListConverter.class)
    private List<String> tpa;
    @Column(name = "altMed", columnDefinition = "TEXT")
    @Convert(converter = StringListConverter.class)
    private List<String> altMed;

    @ManyToMany
    @JoinTable(
            name = "center_medical_facilities",
            joinColumns = @JoinColumn(name = "center_id"),
            inverseJoinColumns = @JoinColumn(name = "medical_facility_id")
    )
    private List<MedicalFacility> medicalFacilities;

    public enum CenterType{
            dialysis,ivf,burns,hairTransplant,checkup,rehabilitation
    }

}
