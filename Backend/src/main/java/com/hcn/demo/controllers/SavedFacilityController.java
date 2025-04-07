package com.hcn.demo.controllers;

import com.hcn.demo.models.*;
import com.hcn.demo.services.SavedFacilityService;
import com.hcn.demo.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/v1/api/saved")
public class SavedFacilityController {

    private final SavedFacilityService savedFacilityServ;

    @PostMapping("/{type}/{id}")
    public ResponseEntity<?> save(@PathVariable String type, @PathVariable String id, Principal principal) {
        Map<String, Object> response = new HashMap<>();
        try{
            savedFacilityServ.saveFacility(id, mapType(type), principal);
            response.put("message","Saved successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{type}/{id}")
    public ResponseEntity<?> unsave(@PathVariable String type, @PathVariable String id, Principal principal) {
        Map<String, Object> response = new HashMap<>();
        try{
            savedFacilityServ.unsaveFacility(id, mapType(type), principal);
            response.put("message","Unsaved successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Internal server Error");
        }
    }

    @GetMapping
    public ResponseEntity<List<SavedFacility>> getSavedFacilities(
            Principal principal,
            @RequestParam(name = "type", required = false) String type,
            @RequestParam(name = "facilityType", required = false) MedicalFacility.FacilityType facilityType,
            @RequestParam(name = "centerType", required = false) Center.CenterType centerType
    ) {
        List<SavedFacility> facilities = savedFacilityServ.getFilteredSavedFacilities(
                principal,
                Optional.ofNullable(type),
                Optional.ofNullable(facilityType),
                Optional.ofNullable(centerType)
        );
        return ResponseEntity.ok(facilities);
    }


    private Class<? extends BaseFacility> mapType(String type) {
        return switch (type.toLowerCase()) {
            case "medical" -> MedicalFacility.class;
            case "bank" -> Bank.class;
            case "diagnostics" -> Diagnostics.class;
            case "homecare" -> Homecare.class;
            case "transport" -> Transport.class;
            case "orthotics" -> Orthotics.class;
            case "center" -> Center.class;
            default -> throw new IllegalArgumentException("Unknown type: " + type);
        };
    }

}
