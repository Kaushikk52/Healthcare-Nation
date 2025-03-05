package com.hcn.demo.services;

import com.hcn.demo.models.*;
import com.hcn.demo.repositories.*;
import com.hcn.demo.specifications.MedicalFacilitySpecification;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class MedicalFacilityService {

    private final MedicalFacilityRepo medicalFacilityRepo;
    private final AddressRepo addressRepo;
    private final RatingRepo ratingRepo;
    private final ReviewRepo reviewRepo;
    private final UserDetailsService userDetailsService;

    @Autowired
    public MedicalFacilityService(MedicalFacilityRepo medicalFacilityRepo, AddressRepo addressRepo, RatingRepo ratingRepo,
                                  ReviewRepo reviewRepo, UserDetailsService userDetailsService){
        this.medicalFacilityRepo = medicalFacilityRepo;
        this.addressRepo = addressRepo;
        this.ratingRepo = ratingRepo;
        this.reviewRepo = reviewRepo;
        this.userDetailsService = userDetailsService;
    }

    public MedicalFacility addHospital(MedicalFacility hospital) {
        MedicalFacility savedHospital= medicalFacilityRepo.save(hospital);
        return savedHospital;
    }

    public MedicalFacility addClinic(MedicalFacility clinic){
        MedicalFacility savedClinic = medicalFacilityRepo.save(clinic);
        return savedClinic;
    }

    public void addRatingToMedicalFacility(String id , Rating rating, Principal principal){
        MedicalFacility facility = this.getFacilityById(id);
        facility.addRating(rating);
        rating.setMedicalFacility(facility);
        User principalUser = (User)userDetailsService.loadUserByUsername(principal.getName());
        rating.setUser(principalUser);
        Double avgRating = ratingRepo.findAverageRatingByMedicalFacilityId(id);
        facility.setAvgRating(avgRating);
        ratingRepo.save(rating);
    }

    public void addReviewToMedicalFacility(String id, Review review,Principal principal){
        MedicalFacility facility = this.getFacilityById(id);
        facility.addReview(review);
        review.setMedicalFacility(facility);
        User principalUser = (User)userDetailsService.loadUserByUsername(principal.getName());
        review.setUser(principalUser);
        reviewRepo.save(review);

    }

    public List<MedicalFacility> getAllFacilities(){
        return medicalFacilityRepo.findAll();
    }

    public List<MedicalFacility> getAllHospitals(){
        return medicalFacilityRepo.findByFacilityType(MedicalFacility.FacilityType.HOSPITAL);
    }

    public List<MedicalFacility> getAllClinics(){
        return medicalFacilityRepo.findByFacilityType(MedicalFacility.FacilityType.CLINIC);
    }

    public MedicalFacility getFacilityById(String id){
        return medicalFacilityRepo.findById(id).orElseThrow(()-> new RuntimeException("Not found ..."));
    }

    public List<MedicalFacility> getFilteredHospitals(Map<String,Object> filters){
        Specification<MedicalFacility> spec = MedicalFacilitySpecification.findByCriteria(filters);
        List<MedicalFacility> filteredHospitals = medicalFacilityRepo.findAll(spec);
        return filteredHospitals;
    }

    public MedicalFacility updateFacility(String id ,MedicalFacility facility){
        MedicalFacility existingFacility = medicalFacilityRepo.findById(id).orElseThrow(()-> new RuntimeException("Not Found..."));
        existingFacility.setName(facility.getName());
        existingFacility.setBed(facility.getBed());
        existingFacility.setUpdatedAt(LocalDateTime.now());
        return medicalFacilityRepo.save(existingFacility);
    }

    public void removeFacility(String id){
        MedicalFacility existingFacility = medicalFacilityRepo.findById(id).orElseThrow(()-> new RuntimeException("Not Found..."));
        medicalFacilityRepo.delete(existingFacility);
    }

}