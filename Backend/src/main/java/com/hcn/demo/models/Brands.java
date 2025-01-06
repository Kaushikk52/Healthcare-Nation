package com.hcn.demo.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
public class Brands {

    @Id
    @Column(name = "id", nullable = false, updatable = false, length = 36)
    private String id;

    @Column(name = "logo", length = 500)
    private String logo;

    @NotNull(message = "Full name cannot be null.")
    @Size(min = 5, max = 30, message = "brandName must be between 5 and 30 characters.")
    @Column(name = "name", nullable = false, length = 30)
    private String name;



}
