package com.hcn.demo.controllers;

import com.hcn.demo.dto.TransportUpdateRequest;
import com.hcn.demo.models.Orthotics;
import com.hcn.demo.models.Rating;
import com.hcn.demo.models.Review;
import com.hcn.demo.models.Transport;
import com.hcn.demo.services.TransportService;
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
@RequestMapping(value = "/v1/api/transport")
@Slf4j
public class TransportController {
    
    @Autowired
    private TransportService transportServ;

    @PostMapping(value = "/save")
    public ResponseEntity<Map<String,Object>> save(@RequestBody Transport transport){
        Map<String,Object> response = new HashMap<>();
        try {
            Transport savedTransport = transportServ.addTransport(transport);
            log.info("Transport posted successfully : {}",savedTransport.getId());
            response.put("message", "Transport posted successfully");
            response.put("savedTransport", savedTransport);
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
            List<Transport> transportList = transportServ.getAll();
            log.info("Retrieved Transport List :{}",transportList.size());
            response.put("message","Retrieved Transport list : "+transportList.size());
            response.put("transportList",transportList);
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
            Transport transport = transportServ.getById(id);
            log.info("Retrieved Transport By Id:{}",transport.getId());
            response.put("message","Retrieved Transport By Id : "+transport.getId());
            response.put("transport",transport);
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
    public ResponseEntity<Map<String,Object>> getFilteredTransport(
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
            List<Transport> filteredTransport;
            if(filters.isEmpty()){
                filteredTransport = transportServ.getAll();
            }else{
                filteredTransport = transportServ.getFilteredTransport(filters);
            }

            if(filteredTransport.isEmpty()){
                log.warn("No Transport found");
                response.put("message", "No Transport found");
            }else{
                log.info("Retrieved filtered Transport");
                response.put("message", "Retrieved filtered Transport : "+filteredTransport.size());
            }
            response.put("transport",filteredTransport);
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
            transportServ.addRating(id,rating,principal);
            Transport transport = transportServ.updateAverageRating(id);
            log.info("Rating {} added successfully : {}", rating,id);
            response.put("message","Rating added successfully");
            response.put("avgRating",transport.getAvgRating());
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
            transportServ.addReview(id,review,principal);
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
    public ResponseEntity<Map<String,Object>> edit(@RequestBody TransportUpdateRequest request){
        Map<String,Object> response = new HashMap<>();
        try{
            Transport updatedTransport = transportServ.edit(request.getTransport(),request.getImagesToDelete());
            response.put("message","Transport updated successfully");
            response.put("updatedTransport", updatedTransport);
            log.info("Transport updated successfully : {}", updatedTransport.getId());
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
            String message = transportServ.delete(id);
            log.info("Transport with ID : {} Deleted successfully",id);
            response.put("message",message);
            return  ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
