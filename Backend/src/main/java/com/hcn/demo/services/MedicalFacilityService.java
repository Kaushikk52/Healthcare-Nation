package com.hcn.demo.services;

import com.hcn.demo.models.*;
import com.hcn.demo.repositories.*;
import com.hcn.demo.specifications.GenericSpecification;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MedicalFacilityService {

    private final MedicalFacilityRepo medicalFacilityRepo;

    private final RatingRepo ratingRepo;
    private final ReviewRepo reviewRepo;
    private final UserDetailsService userDetailsService;
    private final UserRepo userRepo;
    private final ImageService imageServ;

    @Autowired
    public MedicalFacilityService(MedicalFacilityRepo medicalFacilityRepo, RatingRepo ratingRepo, ReviewRepo reviewRepo,
                                  UserRepo userRepo, UserDetailsService userDetailsService, ImageService imageServ){
        this.medicalFacilityRepo = medicalFacilityRepo;
        this.ratingRepo = ratingRepo;
        this.reviewRepo = reviewRepo;
        this.userRepo = userRepo;
        this.userDetailsService = userDetailsService;
        this.imageServ = imageServ;
    }

    public MedicalFacility addHospital(MedicalFacility hospital,User principalUser) {
        hospital.setUser(principalUser);
        MedicalFacility savedHospital= medicalFacilityRepo.save(hospital);
        return savedHospital;
    }

    public MedicalFacility addClinic(MedicalFacility clinic){
        MedicalFacility savedClinic = medicalFacilityRepo.save(clinic);
        return savedClinic;
    }

    public void addRatingToMedicalFacility(String id, Rating rating, Principal principal) {
        MedicalFacility facility = this.getFacilityById(id);
        User principalUser = (User) userDetailsService.loadUserByUsername(principal.getName());

        List<Rating> existingRatings = facility.getRatings();
        Optional<Rating> existingUserRating = existingRatings.stream()
                .filter(r -> r.getUser().equals(principalUser))
                .findFirst();

        if (existingUserRating.isPresent()) {
            // Update existing rating
            existingUserRating.get().setRating(rating.getRating());
            ratingRepo.save(existingUserRating.get());
        } else {
            // Add new rating
            rating.setFacility(facility);
            rating.setUser(principalUser);
            facility.addRating(rating);
            ratingRepo.save(rating);
        }
    }

    public MedicalFacility updateAverageRating(String id){
        MedicalFacility facility = this.getFacilityById(id);
        Double avgRating = ratingRepo.calculateAverageRatingByFacilityId(id);
        facility.setAvgRating(avgRating);
        return medicalFacilityRepo.save(facility);
    }


    public void addReviewToMedicalFacility(String id, Review review,Principal principal){
        MedicalFacility facility = this.getFacilityById(id);
        facility.addReview(review);
        review.setFacility(facility);
        User principalUser = (User)userDetailsService.loadUserByUsername(principal.getName());
        review.setUser(principalUser);
        principalUser.setTotalReviews(principalUser.getTotalReviews()+1);
        userRepo.save(principalUser);
        reviewRepo.save(review);

    }

    public List<MedicalFacility> getAllFacilities(){
        return medicalFacilityRepo.findAll();
    }

    public List<MedicalFacility> getByUserId(String id){
        List<MedicalFacility> facilityList = medicalFacilityRepo.findByUser_Id(id);
        return facilityList;
    }

    public List<MedicalFacility> getAllHospitals(){
        return medicalFacilityRepo.findByFacilityType(MedicalFacility.FacilityType.hospitals);
    }

    public List<MedicalFacility> getAllClinics(){
        return medicalFacilityRepo.findByFacilityType(MedicalFacility.FacilityType.clinics);
    }

    public MedicalFacility getFacilityById(String id){
        return medicalFacilityRepo.findById(id).orElseThrow(()-> new RuntimeException("Not found ..."));
    }

    public List<MedicalFacility> getFilteredFacilities(Map<String,Object> filters){
        Specification<MedicalFacility> spec = GenericSpecification.findByCriteria(filters);
        List<MedicalFacility> filteredHospitals = medicalFacilityRepo.findAll(spec);
        return filteredHospitals;
    }

    public MedicalFacility updateFacility(String id ,MedicalFacility facility,List<String> deleteImages){
        MedicalFacility existingFacility = medicalFacilityRepo.findById(id).orElseThrow(()-> new RuntimeException("Not Found..."));
        List<String> results = imageServ.deleteFiles(deleteImages,"Hospitals");
        BeanUtils.copyProperties(facility,existingFacility,"createdAt","ratings","reviews");
        return medicalFacilityRepo.save(existingFacility);
    }

    public void removeFacility(String id){
        MedicalFacility existingFacility = medicalFacilityRepo.findById(id).orElseThrow(()-> new RuntimeException("Not Found..."));
        List<String> results = imageServ.deleteFiles(existingFacility.getImages(),"Hospitals");
        medicalFacilityRepo.delete(existingFacility);
    }

}