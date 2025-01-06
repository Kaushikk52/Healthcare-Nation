package com.hcn.demo.controllers;

import com.hcn.demo.models.Hospital;
import com.hcn.demo.models.Rating;
import com.hcn.demo.services.HospitalService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/v1/api/hospital")
public class HospitalController {

    @Autowired
    private HospitalService hospitalServ;

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
    public ResponseEntity<Map<String, Object>> addRating(@PathVariable String hospitalId, @RequestBody Rating rating){
        Map<String, Object> response = new HashMap<>();
        try {
            hospitalServ.addRatingToHospital(hospitalId,rating);
            log.info("Hospital rating {} added successfully : {}", rating,hospitalId);
            response.put("message","Rating added successfully");
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
        }
    }
}
