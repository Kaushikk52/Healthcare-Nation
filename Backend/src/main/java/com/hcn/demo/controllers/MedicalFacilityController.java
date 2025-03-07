package com.hcn.demo.controllers;

import com.hcn.demo.models.MedicalFacility;
import com.hcn.demo.models.Rating;
import com.hcn.demo.models.Review;
import com.hcn.demo.services.MedicalFacilityService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    @RequestParam(required = false) List<String> services
    ){
        Map<String,Object> response = new HashMap<>();
        try{
            Map<String,Object> filters = new HashMap<>();
            if(type != null) filters.put("type",type);
            if (services != null && !services.isEmpty()) filters.put("services", services);
            List<MedicalFacility> filteredHospitals = facilityServ.getFilteredHospitals(filters);
            if(filteredHospitals.isEmpty()) {
                log.warn("No Hospitals found");
                response.put("message", "No Hospitals found");
            }else{
                log.info("Retrieved filtered Hospitals");
                response.put("message", "Retrieved filtered Hospitals : "+filteredHospitals.size());
            }
            response.put("hospitals",filteredHospitals);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping(value = "/save")
    public ResponseEntity<Map<String,Object>> addFacility(@RequestBody MedicalFacility facility){
        Map<String,Object> response = new HashMap<>();
        try{
            if(facility.getFacilityType().equals(MedicalFacility.FacilityType.HOSPITAL)){
                MedicalFacility savedHospital = facilityServ.addHospital(facility);
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


    @PostMapping(value = "/{id}/ratings")
    public ResponseEntity<Map<String, Object>> addRating(@PathVariable String id, @RequestBody Rating rating, Principal principal){
        Map<String, Object> response = new HashMap<>();
        try {
            facilityServ.addRatingToMedicalFacility(id,rating,principal);
            log.info("Rating {} added successfully : {}", rating,id);
            response.put("message","Rating added successfully");
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
