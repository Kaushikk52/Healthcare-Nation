package com.hcn.demo.controllers;

import com.hcn.demo.models.Homecare;
import com.hcn.demo.services.HomecareService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/v1/api/homecare")
@Slf4j
public class HomecareController {

    @Autowired
    private HomecareService homecareServ;


    @PostMapping(value = "/save")
    public ResponseEntity<Map<String,Object>> save(@RequestBody Homecare homecare){
        Map<String,Object> response = new HashMap<>();
        try {
            Homecare savedHomecare = homecareServ.addHomecare(homecare);
            log.info("Homecare posted successfully : {}",savedHomecare.getId());
            response.put("message", "Homecare posted successfully");
            response.put("savedHomecare", savedHomecare);
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
            List<Homecare> homecareList = homecareServ.getAll();
            log.info("Retrieved Homecare List :{}",homecareList.size());
            response.put("message","Retrieved Homecare list : "+homecareList.size());
            response.put("homecareList",homecareList);
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
            Homecare homecare = homecareServ.getById(id);
            log.info("Retrieved Homecare By Id:{}",homecare.getId());
            response.put("message","Retrieved Homecare By Id : "+homecare.getId());
            response.put("homecare",homecare);
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


    @PostMapping(value = "/edit")
    public ResponseEntity<Map<String,Object>> edit(@RequestBody Homecare homecare){
        Map<String,Object> response = new HashMap<>();
        try{
            Homecare updatedHomecare = homecareServ.edit(homecare);
            response.put("message","Homecare updated successfully");
            response.put("updatedHomecare", updatedHomecare);
            log.info("Homecare updated successfully : {}", updatedHomecare.getId());
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
            String message = homecareServ.delete(id);
            log.info("Homecare with ID : {} Deleted successfully",id);
            response.put("message",message);
            return  ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

}
