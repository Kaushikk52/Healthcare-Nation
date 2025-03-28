package com.hcn.demo.controllers;

import com.hcn.demo.models.Bank;
import com.hcn.demo.models.Diagnostics;
import com.hcn.demo.services.DiagnosticsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/v1/api/diagnostics")
@Slf4j
public class DiagnosticsController {
    
    @Autowired
    private DiagnosticsService diagnosticsServ;

    @PostMapping(value = "/save")
    public ResponseEntity<Map<String,Object>> save(@RequestBody Diagnostics diagnostics){
        Map<String,Object> response = new HashMap<>();
        try {
            Diagnostics savedDiagnostics = diagnosticsServ.addDiagnostics(diagnostics);
            log.info("Diagnostics posted successfully : {}",savedDiagnostics.getId());
            response.put("message", "Diagnostics posted successfully");
            response.put("savedDiagnostics", savedDiagnostics);
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
            List<Diagnostics> diagnosticsList = diagnosticsServ.getAll();
            log.info("Retrieved Diagnostics List :{}",diagnosticsList.size());
            response.put("message","Retrieved Diagnostics list : "+diagnosticsList.size());
            response.put("diagnosticsList",diagnosticsList);
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
            Diagnostics diagnostics = diagnosticsServ.getById(id);
            log.info("Retrieved Diagnostics By Id:{}",diagnostics.getId());
            response.put("message","Retrieved Diagnostics By Id : "+diagnostics.getId());
            response.put("diagnostics",diagnostics);
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
    public ResponseEntity<Map<String,Object>> getFilteredDiagnostics(
            @RequestParam(required = false) List<String> accreditations,
            @RequestParam(required = false) String ownership,
            @RequestParam(required = false) List<String> diagnostics,
            @RequestParam(required = false) List<String> psu,
            @RequestParam(required = false) List<String> insurance,
            @RequestParam(required = false) List<String> tpa,
            @RequestParam(required = false) List<String> brands,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String search


    ){
        Map<String,Object> response = new HashMap<>();
        try {
            Map<String,Object> filters = new HashMap<>();
            if(location != null) filters.put("location",location);
            if(search != null) filters.put("search",search);
            if (accreditations != null && !accreditations.isEmpty()) filters.put("accreditations", accreditations);
            if (ownership != null && !ownership.isEmpty()) filters.put("ownership", ownership);
            if (brands != null && !brands.isEmpty()) filters.put("brands", brands);
            if (diagnostics != null && !diagnostics.isEmpty()) filters.put("diagnostics", diagnostics);
            if (insurance != null && !insurance.isEmpty()) filters.put("insurance", insurance);
            if (tpa != null && !tpa.isEmpty()) filters.put("tpa", tpa);
            if (psu != null && !psu.isEmpty()) filters.put("psu", psu);
            List<Diagnostics> filteredDiagnostics;
            if(filters.isEmpty()){
                filteredDiagnostics = diagnosticsServ.getAll();
            }else{
                filteredDiagnostics = diagnosticsServ.getFilteredDiagnostics(filters);
            }

            if(filteredDiagnostics.isEmpty()){
                log.warn("No Diagnostics found");
                response.put("message", "No Diagnostics found");
            }else{
                log.info("Retrieved filtered Diagnostics");
                response.put("message", "Retrieved filtered Diagnostics : "+filteredDiagnostics.size());
            }
            response.put("diagnostics",filteredDiagnostics);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    @PostMapping(value = "/edit")
    public ResponseEntity<Map<String,Object>> edit(@RequestBody Diagnostics diagnostics){
        Map<String,Object> response = new HashMap<>();
        try{
            Diagnostics updatedDiagnostics= diagnosticsServ.edit(diagnostics);
            response.put("message","Diagnostics updated successfully");
            response.put("updatedDiagnostics", updatedDiagnostics);
            log.info("Diagnostics updated successfully : {}", updatedDiagnostics.getId());
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
            String message = diagnosticsServ.delete(id);
            log.info("Diagnostics with ID : {} Deleted successfully",id);
            response.put("message",message);
            return  ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
