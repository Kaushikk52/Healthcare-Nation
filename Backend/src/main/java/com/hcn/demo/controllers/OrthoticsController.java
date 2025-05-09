package com.hcn.demo.controllers;

import com.hcn.demo.dto.OrthoticsUpdateRequest;
import com.hcn.demo.models.Orthotics;
import com.hcn.demo.models.Rating;
import com.hcn.demo.models.Review;
import com.hcn.demo.services.OrthoticsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/v1/api/orthotics")
@Slf4j
public class OrthoticsController {

    @Autowired
    private OrthoticsService orthoticsServ;

    @PostMapping(value = "/save")
    public ResponseEntity<Map<String,Object>> save(@RequestBody Orthotics op){
        Map<String,Object> response = new HashMap<>();
        try {
            Orthotics savedOrthotics = orthoticsServ.addOP(op);
            log.info("Orthotics posted successfully : {}",savedOrthotics.getId());
            response.put("message", "Orthotics posted successfully");
            response.put("savedOrthotics", savedOrthotics);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }

    @GetMapping(value = "/all")
    public ResponseEntity<Map<String,Object>> getAll(){
        Map<String,Object> response = new HashMap<>();
        try {
            List<Orthotics> orthoticsList = orthoticsServ.getAll();
            log.info("Retrieved Orthotics List :{}",orthoticsList.size());
            response.put("message","Retrieved Orthotics list : "+orthoticsList.size());
            response.put("orthoticsList",orthoticsList);
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
            Orthotics orthotics = orthoticsServ.getById(id);
            log.info("Retrieved Orthotics By Id:{}",orthotics.getId());
            response.put("message","Retrieved Orthotics By Id : "+orthotics.getId());
            response.put("orthotics",orthotics);
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
    public ResponseEntity<Map<String,Object>> getFilteredOrthotics(
            @RequestParam(required = false) String ownership,
            @RequestParam(required = false) List<String> brands,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String search


    ){
        Map<String,Object> response = new HashMap<>();
        try {
            Map<String,Object> filters = new HashMap<>();
            if(location != null) filters.put("location",location);
            if(search != null) filters.put("search",search);
            if (ownership != null && !ownership.isEmpty()) filters.put("ownership", ownership);
            if (brands != null && !brands.isEmpty()) filters.put("brands", brands);
            List<Orthotics> filteredOrthotics;
            if(filters.isEmpty()){
                filteredOrthotics = orthoticsServ.getAll();
            }else{
                filteredOrthotics = orthoticsServ.getFilteredOrthotics(filters);
            }

            if(filteredOrthotics.isEmpty()){
                log.warn("No Orthotics found");
                response.put("message", "No Orthotics found");
            }else{
                log.info("Retrieved filtered Orthotics");
                response.put("message", "Retrieved filtered Orthotics : "+filteredOrthotics.size());
            }
            response.put("orthotics",filteredOrthotics);
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
            orthoticsServ.addRating(id,rating,principal);
            Orthotics orthotics = orthoticsServ.updateAverageRating(id);
            log.info("Rating {} added successfully : {}", rating,id);
            response.put("message","Rating added successfully");
            response.put("avgRating",orthotics.getAvgRating());
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
            orthoticsServ.addReview(id,review,principal);
            log.info("Review added successfully : {}",id);
            response.put("message","Review added successfully");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping(value = "/edit")
    public ResponseEntity<Map<String,Object>> edit(@RequestBody OrthoticsUpdateRequest request){
        Map<String,Object> response = new HashMap<>();
        try{
            Orthotics updatedOP = orthoticsServ.edit(request.getOrthotics(),request.getImagesToDelete());
            response.put("message","Orthotics updated successfully");
            response.put("updatedOrthotics", updatedOP);
            log.info("Orthotics updated successfully : {}", updatedOP.getId());
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping(value = "/delete/{id}")
    public ResponseEntity<Map<String,Object>> delete(@PathVariable String id){
        Map<String,Object> response = new HashMap<>();
        try{
            String message = orthoticsServ.delete(id);
            log.info("OP with ID : {} Deleted successfully",id);
            response.put("message",message);
            return  ResponseEntity.status(HttpStatus.OK).body(response);

        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

}
