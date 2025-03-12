package com.hcn.demo.controllers;

import com.hcn.demo.models.SavedFacility;
import com.hcn.demo.models.User;
import com.hcn.demo.services.SavedFacilityService;
import com.hcn.demo.services.UserService;
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
@RequestMapping(value = "/v1/api/saved")
public class SavedFacilityController {

    @Autowired
    private SavedFacilityService savedFacilityServ;

    @Autowired
    private UserService userServ;
    @PostMapping("/{hospitalId}")
    public ResponseEntity<?> saveHospital(@PathVariable String hospitalId, Principal principal) {
        Map<String, Object> response = new HashMap<>();
        try{
            User currentUser = userServ.getCurrentUserRole(principal);
            savedFacilityServ.saveHospital(currentUser.getId(), hospitalId);
            response.put("message","Hospital saved successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Internal server Error");
        }

    }

    @GetMapping("/hospitals")
    public ResponseEntity<List<SavedFacility>> getSavedHospitals(Principal principal) {
        User currentUser = userServ.getCurrentUserRole(principal);
        return ResponseEntity.ok(savedFacilityServ.getSavedHospitals(currentUser.getId()));
    }

    @DeleteMapping("/{hospitalId}")
    public ResponseEntity<?> removeSavedHospital(Principal principal, @PathVariable String hospitalId) {
        Map<String, Object> response = new HashMap<>();
        try{
            User currentUser = userServ.getCurrentUserRole(principal);
            savedFacilityServ.removeSavedHospital(currentUser.getId(), hospitalId);
            response.put("message","Hospital saved successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Internal server Error");
        }
    }
}
