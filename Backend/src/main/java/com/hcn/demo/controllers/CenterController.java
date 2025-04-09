package com.hcn.demo.controllers;

import com.hcn.demo.dto.CenterUpdateRequest;
import com.hcn.demo.models.Bank;
import com.hcn.demo.models.Center;
import com.hcn.demo.models.Rating;
import com.hcn.demo.models.User;
import com.hcn.demo.services.CenterService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/v1/api/center")
public class CenterController {

    @Autowired
    private UserDetailsService userDetailsServ;

    @Autowired
    private CenterService centerServ;

    @PostMapping(value = "/save")
    public ResponseEntity<Map<String,Object>> addCenter(@RequestBody Center center, Principal principal){
        Map<String,Object> response = new HashMap<>();
        try{
            User currentUser = (User) userDetailsServ.loadUserByUsername(principal.getName());
            Center savedCenter = centerServ.addCenter(center,currentUser);
            log.info("Center posted successfully : {}",savedCenter.getId());
            response.put("message", "Center posted successfully");
            response.put("savedCenter", savedCenter);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }catch (Exception e){
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }

    @GetMapping(value = "/all")
    public ResponseEntity<Map<String,Object>> getAllCenters(){
        Map<String,Object> response = new HashMap<>();
        try{
            List<Center> centerList = centerServ.getAll();
            log.info("Retrieved Center List :{}",centerList.size());
            response.put("message","Retrieved Center list : "+centerList.size());
            response.put("center",centerList);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping(value = "/all/{type}")
    public ResponseEntity<Map<String,Object>> getAllCentersByType(@PathVariable String type){
        Map<String,Object> response = new HashMap<>();
        try{
            List<Center> centerList = centerServ.getAll();
            log.info("Retrieved Center List By Type {} :{}",type,centerList.size());
            response.put("message","Retrieved Center list By Type"+type+" : "+centerList.size());
            response.put("centerList",centerList);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping(value = "/id/{id}")
    public ResponseEntity<Map<String,Object>> getCenterById(@PathVariable String id){
        Map<String,Object> response = new HashMap<>();
        try {
            Center center = centerServ.getById(id);
            log.info("Retrieved Center By Id:{}",center.getId());
            response.put("message","Retrieved Center By Id : "+center.getId());
            response.put("center",center);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (RuntimeException e) {
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
    public ResponseEntity<Map<String,Object>> getFilteredCenters(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) List<String> diagnostics,
            @RequestParam(required = false) List<String> accreditations,
            @RequestParam(required = false) String ownership,
            @RequestParam(required = false) List<String> specialities,
            @RequestParam(required = false) List<String> psu,
            @RequestParam(required = false) List<String> brands,
            @RequestParam(required = false) List<String> services,
            @RequestParam(required = false) List<String> concerns,
            @RequestParam(required = false) List<String> insurance,
            @RequestParam(required = false) List<String> tpa,
            @RequestParam(required = false) List<String> altMed,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String search
    ){
        Map<String,Object> response = new HashMap<>();
        try{
            Map<String,Object> filters = new HashMap<>();
            if(type != null) filters.put("centerType",type);
            if(location != null) filters.put("location",location);
            if(search != null) filters.put("search",search);
            if (accreditations != null && !accreditations.isEmpty()) filters.put("accreditations", accreditations);
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

            List<Center> filteredCenters;
            if(filters.isEmpty()){
                filteredCenters = centerServ.getAll();
            }else{
                filteredCenters = centerServ.getFilteredCenters(filters);
            }

            if(filteredCenters.isEmpty()){
                log.warn("No Centers found");
                response.put("message", "No Centers found");
            }else{
                log.info("Retrieved filtered Centers");
                response.put("message", "Retrieved filtered Centers : "+filteredCenters.size());
            }
            response.put(type,filteredCenters);
            return ResponseEntity.status(HttpStatus.OK).body(response);

        }catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    @PostMapping(value = "/{id}/rating")
    public ResponseEntity<Map<String, Object>> addRating(@PathVariable String id, @RequestBody Rating rating, Principal principal){
        Map<String, Object> response = new HashMap<>();
        try {
            centerServ.addRating(id,rating,principal);
            Center center = centerServ.updateAverageRating(id);
            log.info("Rating {} added successfully : {}", rating,id);
            response.put("message","Rating added successfully");
            response.put("avgRating",center.getAvgRating());
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }


    @PostMapping(value = "/edit")
    public ResponseEntity<Map<String,Object>> edit(@RequestBody CenterUpdateRequest request){
        Map<String,Object> response = new HashMap<>();
        try {
            Center updatedCenter= centerServ.updateCenter(request.getCenter(),request.getImagesToDelete());
            response.put("message","Center updated successfully");
            response.put("updatedCenter", updatedCenter);
            log.info("Center updated successfully : {}", updatedCenter.getId());
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping(value = "/delete/{id}")
    public ResponseEntity<Map<String,Object>> delete(@PathVariable String id){
        Map<String,Object> response = new HashMap<>();
        try{
            centerServ.deleteCenter(id);
            log.info("Center with ID : {} Deleted successfully",id);
            response.put("message","Center deleted successfully");
            return  ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

}
