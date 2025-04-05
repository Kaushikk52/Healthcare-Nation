package com.hcn.demo.controllers;

import com.hcn.demo.models.Enquiry;
import com.hcn.demo.services.EnquiryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping(value = "/v1/api/enquiry")
public class EnquiryController {

    @Autowired
    private EnquiryService enquiryServ;

    @PostMapping(value = "/email")
    public ResponseEntity<String> sendNotification(@RequestBody Enquiry enquiry) {
        try{
            String message = enquiryServ.notifyEnquiry(enquiry);
            log.info("Notification for enquiry sent to {}",enquiry.getEmail());
            return ResponseEntity.status(HttpStatus.OK).body(message);
        }catch (Exception e){
            log.warn("An Error occurred : {}",e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_MODIFIED).body(e.getMessage());
        }
    }
}
