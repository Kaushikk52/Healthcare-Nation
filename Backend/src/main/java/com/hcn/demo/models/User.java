package com.hcn.demo.models;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User implements UserDetails {
    @Id
    @Column(name = "user_id",nullable = false,updatable = false,length = 36)
    private String id;

    @Column(name = "token",unique = true)
    private String token;

    @Column(name = "first_name",nullable = false,length = 30)
    private String firstName;

    @Column(name = "last_name",nullable = false,length = 30)
    private String lastName;

    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "phone", nullable = false, unique = true, length = 15)
    private String phone;

    @Column(name = "password", nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false, length = 10)
    private UserRole role;

    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL)
    private List<Review> reviews;

    public enum UserRole {
        ROLE_USER,ROLE_ADMIN;
    }

    @PrePersist
    private void prePersist() {
        if (this.id == null) {
            this.id = UUID.randomUUID().toString();
        }
        if (this.role == null) {
            this.role = UserRole.ROLE_USER;
        }
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getUsername() {
        return this.email;
    }


}
