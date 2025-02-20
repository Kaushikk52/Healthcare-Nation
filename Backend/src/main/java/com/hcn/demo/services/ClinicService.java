package com.hcn.demo.services;

import com.hcn.demo.models.*;
import com.hcn.demo.repositories.AddressRepo;
import com.hcn.demo.repositories.ClinicRepo;
import com.hcn.demo.repositories.RatingRepo;
import com.hcn.demo.repositories.ReviewRepo;
import com.hcn.demo.specifications.ClinicSpecification;
import com.hcn.demo.specifications.HospitalSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class ClinicService {
    private final ClinicRepo clinicRepo;
    private final AddressRepo addressRepo;
    private final RatingRepo ratingRepo;
    private final ReviewRepo reviewRepo;
    private final UserDetailsService userDetailsService;

    @Autowired
    public ClinicService(ClinicRepo clinicRepo, AddressRepo addressRepo, RatingRepo ratingRepo, ReviewRepo reviewRepo,
                         UserDetailsService userDetailsService){
        this.clinicRepo = clinicRepo;
        this.addressRepo = addressRepo;
        this.ratingRepo = ratingRepo;
        this.reviewRepo = reviewRepo;
        this.userDetailsService = userDetailsService;
    }

    public Clinic addClinic(Clinic clinic){
        Address savedAddress = addressRepo.save(clinic.getAddress());
        clinic.setAddress(savedAddress);
        return clinicRepo.save(clinic);
    }

    public List<Clinic> getAllClinics(){
        return clinicRepo.findAll();
    }

    public Clinic getClinicById(String id){
        return clinicRepo.findById(id).orElseThrow(()-> new RuntimeException("Not found ..."));
    }

    public void addRatingToClinic(String clinicId , Rating rating, Principal principal){
        Clinic clinic = this.getClinicById(clinicId);
        clinic.addRating(rating);
        rating.setClinic(clinic);
        User principalUser = (User)userDetailsService.loadUserByUsername(principal.getName());
        rating.setUser(principalUser);
        Double avgRating = ratingRepo.findAverageRatingByClinicId(clinicId);
        clinic.setAvgRating(avgRating);
        ratingRepo.save(rating);
    }

    public void addReviewToClinic(String clinicId, Review review,Principal principal){
        Clinic clinic = this.getClinicById(clinicId);
        clinic.addReview(review);
        review.setClinic(clinic);
        User principalUser = (User)userDetailsService.loadUserByUsername(principal.getName());
        review.setUser(principalUser);
        reviewRepo.save(review);

    }

    public List<Clinic> getFilteredClinics(Map<String,Object> filters){
        Specification<Clinic> spec = ClinicSpecification.findByCriteria(filters);
        List<Clinic> filteredClinics = clinicRepo.findAll(spec);
        return filteredClinics;
    }


    public Clinic updateClinic(String id ,Clinic clinic){
        Clinic existingClinic = this.getClinicById(id);
        existingClinic.setName(clinic.getName());
        existingClinic.setPhone(clinic.getPhone());
        existingClinic.setUpdatedAt(LocalDateTime.now());
        return clinicRepo.save(existingClinic);
    }

    public void removeClinic(String id){
        Clinic existingClinic = this.getClinicById(id);
        clinicRepo.delete(existingClinic);
    }


}
