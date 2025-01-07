package com.hcn.demo.controllers;

import com.hcn.demo.models.Hospital;
import com.hcn.demo.models.Rating;
import com.hcn.demo.models.Review;
import com.hcn.demo.services.HospitalService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/v1/api/hospital")
public class HospitalController {

    @Autowired
    private HospitalService hospitalServ;

    @GetMapping(value = "/all")
    public ResponseEntity<Map<String, Object>> getAll(){
        Map<String,Object> response = new HashMap<>();
        try{
            List<Hospital> hospitalList = hospitalServ.getAllHospitals();
            if(hospitalList.isEmpty()) {
                log.warn("Hospital Repository is empty");
                response.put("message", "Hospital Respository is empty");
            }else{
                log.info("Retrieved Hospital List :{}",hospitalList.size());
                response.put("message","Retrieved Hospital list : "+hospitalList.size());
            }
            response.put("hospitals",hospitalList);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Map<String,Object>> getById(@PathVariable String id){
        Map<String,Object> response = new HashMap<>();
        try {
            Hospital hospital = hospitalServ.getHospitalById(id);
            log.info("Retrieved hospital with ID : {}", id);
            response.put("message","Retrieved hospital by ID : "+id);
            response.put("hospital",hospital);
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
    public ResponseEntity<Map<String,Object>> getFilteredHospitals(@RequestParam(required = false) String type){
        Map<String,Object> response = new HashMap<>();
        try{
            Map<String,Object> filters = new HashMap<>();
            if(type != null) filters.put("type",type);
            List<Hospital> filteredHospitals = hospitalServ.getFilteredHospitals(filters);
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
    public ResponseEntity<Map<String,Object>> addHospital(@RequestBody Hospital hospital){
        Map<String,Object> response = new HashMap<>();
        try{
            Hospital savedHospital = hospitalServ.addHospital(hospital);
            log.info("Hospital posted successfully : {}",savedHospital.getId());
            response.put("message","Hospital posted successfully");
            return  ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }

    @PostMapping(value = "/{hospitalId}/ratings")
    public ResponseEntity<Map<String, Object>> addRating(@PathVariable String hospitalId, @RequestBody Rating rating, Principal principal){
        Map<String, Object> response = new HashMap<>();
        try {
            hospitalServ.addRatingToHospital(hospitalId,rating,principal);
            log.info("Hospital rating {} added successfully : {}", rating,hospitalId);
            response.put("message","Rating added successfully");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }

    @PostMapping(value = "/{hospitalId}/review")
    public ResponseEntity<Map<String,Object>> addReview(@PathVariable String hospitalId, @RequestBody Review review, Principal principal){
        Map<String,Object> response = new HashMap<>();
        try{
            hospitalServ.addReviewToHospital(hospitalId,review,principal);
            log.info("Hospital review added successfully : {}",hospitalId);
            response.put("message","Review added successfully");
            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping(value = "/edit/{id}")
    public ResponseEntity<Map<String,Object>> editHospital(@PathVariable String id ,@RequestBody Hospital hospital){
        Map<String,Object> response = new HashMap<>();
        try {
            hospitalServ.updateHospital(id ,hospital);
            response.put("message","Hospital updated successfully");
            log.info("Hospital updated successfully : {}", hospital.getId());
            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Map<String,Object>> removeHospital(@PathVariable String id){
        Map<String,Object> response = new HashMap<>();
        try{
            hospitalServ.removeHospital(id);
            log.info("Hospital with ID : {} Deleted successfully",id);
            response.put("message","Hospital deleted successfully");
            return  ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

}
