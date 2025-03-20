package com.hcn.demo.controllers;

import com.hcn.demo.models.MedicalFacility;
import com.hcn.demo.models.Rating;
import com.hcn.demo.models.Review;
import com.hcn.demo.models.User;
import com.hcn.demo.services.MedicalFacilityService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/v1/api/facility")
public class MedicalFacilityController {

    @Autowired
    private MedicalFacilityService facilityServ;

    @Autowired
    private UserDetailsService userDetailsServ;

    @GetMapping(value = "/type/{type}")
    public ResponseEntity<Map<String, Object>> getAll(@PathVariable String type){
        Map<String,Object> response = new HashMap<>();
        List<MedicalFacility> facilitiesList = new ArrayList<>();
        try{
            switch (type){
                case "all":
                    facilitiesList = facilityServ.getAllFacilities();
                    log.info("Retrieved Facilities List :{}",facilitiesList.size());
                    response.put("message","Retrieved Facilites list : "+facilitiesList.size());
                    response.put("facilites",facilitiesList);
                    break;
                case "hospitals":
                    facilitiesList = facilityServ.getAllHospitals();
                    log.info("Retrieved Hospitals List :{}",facilitiesList.size());
                    response.put("message","Retrieved Hospitals list : "+facilitiesList.size());
                    response.put("hospitals",facilitiesList);
                    break;
                case "clinics":
                    facilitiesList = facilityServ.getAllClinics();
                    log.info("Retrieved Clinics List :{}",facilitiesList.size());
                    response.put("message","Retrieved Clinics list : "+facilitiesList.size());
                    response.put("clinics",facilitiesList);
                    break;
            }

            if( facilitiesList.isEmpty()) {
                log.warn("Facilities Repository is empty");
                response.put("message", "Facilities Respository is empty");
            }
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping(value = "/current-user")
    public ResponseEntity<Map<String,Object>> getByCurrentUser(Principal principal){
        Map<String,Object> response = new HashMap<>();
        List<MedicalFacility> facilitiesList = new ArrayList<>();
        try {
            User currentUser = (User)userDetailsServ.loadUserByUsername(principal.getName());
            List<MedicalFacility> facilityList = facilityServ.getByUserId(currentUser.getId());
            log.info("Retreived Facilities {} by User ID : {}",facilityList.size(),currentUser.getId());
            response.put("message", "Retrived Facilties :"+facilityList.size()+" by User ID : "+currentUser.getId());
            response.put("facilities",facilityList);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping(value = "/id/{id}")
    public ResponseEntity<Map<String,Object>> getById(@PathVariable String id){
        Map<String,Object> response = new HashMap<>();
        try {
            MedicalFacility facility = facilityServ.getFacilityById(id);
            log.info("Retrieved facility with ID : {}", id);
            response.put("message","Retrieved facility by ID : "+id);
            response.put("facility",facility);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (RuntimeException e) {
            log.warn("A RuntimeException occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);

        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping(value = "/filter")
    public ResponseEntity<Map<String,Object>> getFilteredHospitals(@RequestParam(required = false) String type,
                                                                   @RequestParam(required = false) List<String> diagnostics,
                                                                   @RequestParam(required = false) List<String> accrediation,
                                                                   @RequestParam(required = false) String ownership,
                                                                   @RequestParam(required = false) List<String> specialities,
                                                                   @RequestParam(required = false) List<String> psu,
                                                                   @RequestParam(required = false) List<String> brands,
                                                                   @RequestParam(required = false) List<String> services,
                                                                   @RequestParam(required = false) List<String> concerns,
                                                                   @RequestParam(required = false) List<String> insurance,
                                                                   @RequestParam(required = false) List<String> tpa,
                                                                   @RequestParam(required = false) List<String> altMed

    ){
        Map<String,Object> response = new HashMap<>();
        try{
            Map<String,Object> filters = new HashMap<>();
            if(type != null) filters.put("type",type);
            if (accrediation != null && !accrediation.isEmpty()) filters.put("accrediations", accrediation);
            if (ownership != null && !ownership.isEmpty()) filters.put("ownership", ownership);
            if (specialities != null && !specialities.isEmpty()) filters.put("specialities", specialities);
            if (psu != null && !psu.isEmpty()) filters.put("psu", psu);
            if (brands != null && !brands.isEmpty()) filters.put("brands", brands);
            if (diagnostics != null && !diagnostics.isEmpty()) filters.put("diagnostics", diagnostics);
            if (services != null && !services.isEmpty()) filters.put("services", services);
            if (concerns != null && !concerns.isEmpty()) filters.put("concerns", concerns);
            if (insurance != null && !insurance.isEmpty()) filters.put("insurance", insurance);
            if (tpa != null && !tpa.isEmpty()) filters.put("tpa", tpa);
            if (altMed != null && !altMed.isEmpty()) filters.put("altMed", altMed);
            List<MedicalFacility> filteredFacilities;
            if(filters.isEmpty()){
                 filteredFacilities = type.equals("hospitals") ?
                                facilityServ.getAllHospitals()
                                : facilityServ.getAllClinics();
            }else{
                filteredFacilities= facilityServ.getFilteredFacilities(filters);
            }

            if(filteredFacilities.isEmpty()) {
                log.warn("No Hospitals found");
                response.put("message", "No Hospitals found");
            }else{
                log.info("Retrieved filtered Hospitals");
                response.put("message", "Retrieved filtered Facilities : "+filteredFacilities.size());
            }
            response.put(type,filteredFacilities);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping(value = "/save")
    public ResponseEntity<Map<String,Object>> addFacility(@RequestBody MedicalFacility facility,Principal principal){
        Map<String,Object> response = new HashMap<>();
        try{
            if(facility.getFacilityType().equals(MedicalFacility.FacilityType.hospitals)){
                User principalUser = (User)userDetailsServ.loadUserByUsername(principal.getName());
                MedicalFacility savedHospital = facilityServ.addHospital(facility,principalUser);
                log.info("Hospital posted successfully : {}",savedHospital.getId());
                response.put("message","Hospital posted successfully");
            }else{
                MedicalFacility savedClinic = facilityServ.addClinic(facility);
                log.info("Clinic posted successfully : {}",savedClinic.getId());
                response.put("message","Clinic posted successfully");
            }
            return  ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }


    @PostMapping(value = "/{id}/rating")
    public ResponseEntity<Map<String, Object>> addRating(@PathVariable String id, @RequestBody Rating rating, Principal principal){
        Map<String, Object> response = new HashMap<>();
        try {
            facilityServ.addRatingToMedicalFacility(id,rating,principal);
            MedicalFacility facility = facilityServ.updateAverageRating(id);
            log.info("Rating {} added successfully : {}", rating,id);
            response.put("message","Rating added successfully");
            response.put("avgRating",facility.getAvgRating());
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }

    @PostMapping(value = "/{id}/review")
    public ResponseEntity<Map<String,Object>> addReview(@PathVariable String id, @RequestBody Review review, Principal principal){
        Map<String,Object> response = new HashMap<>();
        try{
            facilityServ.addReviewToMedicalFacility(id,review,principal);
            log.info("Review added successfully : {}",id);
            response.put("message","Review added successfully");
            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping(value = "/edit/{id}")
    public ResponseEntity<Map<String,Object>> editFacility(@PathVariable String id ,@RequestBody MedicalFacility facility){
        Map<String,Object> response = new HashMap<>();
        try {
            facilityServ.updateFacility(id ,facility);
            response.put("message","Facility updated successfully");
            log.info("Facility updated successfully : {}", facility.getId());
            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Map<String,Object>> removeFacility(@PathVariable String id){
        Map<String,Object> response = new HashMap<>();
        try{
            facilityServ.removeFacility(id);
            log.info("Facility with ID : {} Deleted successfully",id);
            response.put("message","Facility deleted successfully");
            return  ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

}
