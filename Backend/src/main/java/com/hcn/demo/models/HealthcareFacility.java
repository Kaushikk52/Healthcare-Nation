package com.hcn.demo.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
public abstract class HealthcareFacility {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "phoneNumbers", length = 500)
    private String[] phone;

    @Column(name = "images", length = 5000, columnDefinition = "VARBINARY(5000)")
    private String[] images;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;

    @Lob
    @Column(name = "description",columnDefinition = "TEXT")
    private String description;

    @ElementCollection
    private Set<String> tags;

    @ElementCollection
    private Set<String> Psu; // Public sector


    @PastOrPresent(message = "Creation date must be in the past or present")
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date createdAt;

    @PastOrPresent(message = "Update date must be in the past or present")
    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = true)
    private Date updatedAt;

    private boolean isActive;
}
