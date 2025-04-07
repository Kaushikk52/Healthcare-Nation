package com.hcn.demo.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@DiscriminatorValue("MEDICAL")
public class MedicalFacility extends BaseFacility implements FacilityReference{

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

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

    @ManyToMany(mappedBy = "medicalFacilities")
    private List<Orthotics> orthotics;

    @ManyToMany(mappedBy = "medicalFacilities")
    private List<Homecare> homecare;

    @ManyToMany(mappedBy = "medicalFacilities")
    private List<Transport> transport;

    @ManyToMany(mappedBy = "medicalFacilities")
    private List<Bank> bank;

    @ManyToMany(mappedBy = "medicalFacilities")
    private List<Diagnostics> diagnosticsList;

    @ManyToMany(mappedBy = "medicalFacilities")
    private List<Center> center;


}
