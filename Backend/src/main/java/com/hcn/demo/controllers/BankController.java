package com.hcn.demo.controllers;

import com.hcn.demo.models.Bank;
import com.hcn.demo.services.BankService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/v1/api/bank")
@Slf4j
public class BankController {
    
    @Autowired
    private BankService bankServ;


    @PostMapping(value = "/save")
    public ResponseEntity<Map<String,Object>> save(@RequestBody Bank bank){
        Map<String,Object> response = new HashMap<>();
        try {
            Bank savedBank = bankServ.addBank(bank);
            log.info("Bank posted successfully : {}",savedBank.getId());
            response.put("message", "Bank posted successfully");
            response.put("savedBank", savedBank);
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
            List<Bank> bankList = bankServ.getAll();
            log.info("Retrieved Bank List :{}",bankList.size());
            response.put("message","Retrieved Bank list : "+bankList.size());
            response.put("bankList",bankList);
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
            Bank bank = bankServ.getById(id);
            log.info("Retrieved Bank By Id:{}",bank.getId());
            response.put("message","Retrieved Bank By Id : "+bank.getId());
            response.put("bank",bank);
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
    public ResponseEntity<Map<String,Object>> edit(@RequestBody Bank bank){
        Map<String,Object> response = new HashMap<>();
        try{
            Bank updatedBank= bankServ.edit(bank);
            response.put("message","Bank updated successfully");
            response.put("updatedBank", updatedBank);
            log.info("Bank updated successfully : {}", updatedBank.getId());
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
            String message = bankServ.delete(id);
            log.info("Bank with ID : {} Deleted successfully",id);
            response.put("message",message);
            return  ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            log.warn("An Error occurred : {}", e.getMessage());
            response.put("message",e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
}
