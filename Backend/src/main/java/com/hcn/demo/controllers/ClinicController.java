package com.hcn.demo.controllers;

import com.hcn.demo.models.Clinic;
import com.hcn.demo.models.Hospital;
import com.hcn.demo.models.Rating;
import com.hcn.demo.models.Review;
import com.hcn.demo.services.ClinicService;
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
@RequestMapping("/v1/api/clinic")
public class ClinicController {

    @Autowired
    private ClinicService clinicServ;

    @GetMapping(value = "/all")
    public ResponseEntity<Map<String, Object>> getAll(){
        Map<String,Object> response = new HashMap<>();
        try{
            List<Clinic> clinicList = clinicServ.getAllClinics();
            if(clinicList.isEmpty()) {
                log.warn("Clinic Repository is empty");
                response.put("message", "Clinic Respository is empty");
            }else{
                log.info("Retrieved Clinic List :{}",clinicList.size());
                response.put("message","Retrieved Clinic list : "+clinicList.size());
            }
            response.put("clinics",clinicList);
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
            Clinic clinic = clinicServ.getClinicById(id);
            log.info("Retrieved clinic with ID : {}", id);
            response.put("message","Retrieved clinic by ID : "+id);
            response.put("clinic",clinic);
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
    public ResponseEntity<Map<String,Object>> getFilteredClinics(@RequestParam(required = false) String type,
                                                                   @RequestParam(required = false) List<String> services
    ){
        Map<String,Object> response = new HashMap<>();
        try{
            Map<String,Object> filters = new HashMap<>();
            if(type != null) filters.put("type",type);
            if (services != null && !services.isEmpty()) filters.put("services", services);
            List<Clinic> filteredClinics = clinicServ.getFilteredClinics(filters);
            if(filteredClinics.isEmpty()) {
                log.warn("No Clinics found");
                response.put("message", "No Clinic found");
            }else{
                log.info("Retrieved filtered Clinic");
                response.put("message", "Retrieved filtered Clinic : "+filteredClinics.size());
            }
            response.put("clinics",filteredClinics);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping(value = "/save")
    public ResponseEntity<Map<String,Object>> addClinic(@RequestBody Clinic clinic){
        Map<String,Object> response = new HashMap<>();
        try{
            Clinic savedClinic = clinicServ.addClinic(clinic);
            log.info("Clinic posted successfully : {}",savedClinic.getId());
            response.put("message","Clinic posted successfully");
            return  ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }

    @PostMapping(value = "/{clinicId}/ratings")
    public ResponseEntity<Map<String, Object>> addRating(@PathVariable String clinicId, @RequestBody Rating rating, Principal principal){
        Map<String, Object> response = new HashMap<>();
        try {
            clinicServ.addRatingToClinic(clinicId,rating,principal);
            log.info("Clinic rating {} added successfully : {}", rating,clinicId);
            response.put("message","Rating added successfully");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }

    @PostMapping(value = "/{clinicId}/review")
    public ResponseEntity<Map<String,Object>> addReview(@PathVariable String clinicId, @RequestBody Review review, Principal principal){
        Map<String,Object> response = new HashMap<>();
        try{
            clinicServ.addReviewToClinic(clinicId,review,principal);
            log.info("Clinic review added successfully : {}",clinicId);
            response.put("message","Review added successfully");
            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping(value = "/edit/{id}")
    public ResponseEntity<Map<String,Object>> editClinic(@PathVariable String id ,@RequestBody Clinic clinic){
        Map<String,Object> response = new HashMap<>();
        try {
            clinicServ.updateClinic(id ,clinic);
            response.put("message","Clinic updated successfully");
            log.info("Clinic updated successfully : {}", clinic.getId());
            return ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<Map<String,Object>> removeClinic(@PathVariable String id){
        Map<String,Object> response = new HashMap<>();
        try{
            clinicServ.removeClinic(id);
            log.info("Clinic with ID : {} Deleted successfully",id);
            response.put("message","Clinic deleted successfully");
            return  ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
