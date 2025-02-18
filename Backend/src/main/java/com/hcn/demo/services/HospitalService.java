package com.hcn.demo.services;

import com.hcn.demo.models.*;
import com.hcn.demo.repositories.AddressRepo;
import com.hcn.demo.repositories.HospitalRepo;
import com.hcn.demo.repositories.RatingRepo;
import com.hcn.demo.repositories.ReviewRepo;
import com.hcn.demo.specifications.HospitalSpecification;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class HospitalService {

    private final HospitalRepo hospitalRepo;
    private final AddressRepo addressRepo;
    private final RatingRepo ratingRepo;
    private final ReviewRepo reviewRepo;
    private final UserDetailsService userDetailsService;

    @Autowired
    public HospitalService(HospitalRepo hospitalRepo,AddressRepo addressRepo,RatingRepo ratingRepo, ReviewRepo reviewRepo,UserDetailsService userDetailsService){
        this.hospitalRepo = hospitalRepo;
        this.addressRepo = addressRepo;
        this.ratingRepo = ratingRepo;
        this.reviewRepo = reviewRepo;
        this.userDetailsService = userDetailsService;
    }

    @Transactional
    public Hospital addHospital(Hospital hospital){
        Address savedAddress = addressRepo.save(hospital.getAddress());
        hospital.setAddress(savedAddress);
        return hospitalRepo.save(hospital);
    }

    public void addRatingToHospital(String hospitalId , Rating rating, Principal principal){
        Hospital hospital = this.getHospitalById(hospitalId);
        hospital.addRating(rating);
        rating.setHospital(hospital);
        User principalUser = (User)userDetailsService.loadUserByUsername(principal.getName());
        rating.setUser(principalUser);
        Double avgRating = ratingRepo.findAverageRatingByHospitalId(hospitalId);
        hospital.setAvgRating(avgRating);
        ratingRepo.save(rating);
    }

    public void addReviewToHospital(String hospitalId, Review review,Principal principal){
        Hospital hospital = this.getHospitalById(hospitalId);
        hospital.addReview(review);
        review.setHospital(hospital);
        User principalUser = (User)userDetailsService.loadUserByUsername(principal.getName());
        review.setUser(principalUser);
        reviewRepo.save(review);

    }

    public List<Hospital> getAllHospitals(){
        return hospitalRepo.findAll();
    }

    public Hospital getHospitalById(String id){
        return hospitalRepo.findById(id).orElseThrow(()-> new RuntimeException("Not found ..."));
    }

    public List<Hospital> getFilteredHospitals(Map<String,Object> filters){
        Specification<Hospital> spec = HospitalSpecification.findByCriteria(filters);
        List<Hospital> filteredHospitals = hospitalRepo.findAll(spec);
        return filteredHospitals;
    }

    public Hospital updateHospital(String id ,Hospital hospital){
        Hospital existingHospital = hospitalRepo.findById(id).orElseThrow(()-> new RuntimeException("Not Found..."));
        existingHospital.setName(hospital.getName());
        existingHospital.setBed(hospital.getBed());
        existingHospital.setUpdatedAt(LocalDateTime.now());
        return hospitalRepo.save(existingHospital);
    }

    public void removeHospital(String id){
        Hospital existingHospital = hospitalRepo.findById(id).orElseThrow(()-> new RuntimeException("Not Found..."));
        hospitalRepo.delete(existingHospital);
    }

}