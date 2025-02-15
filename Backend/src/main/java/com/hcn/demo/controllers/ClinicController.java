package com.hcn.demo.controllers;

import com.hcn.demo.services.ClinicService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/v1/api/clinic")
public class ClinicController {

    @Autowired
    private ClinicService clinicServ;





}
