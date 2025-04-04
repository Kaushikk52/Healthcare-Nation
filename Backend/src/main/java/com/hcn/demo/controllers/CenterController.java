package com.hcn.demo.controllers;

import com.hcn.demo.services.CenterService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/v1/api/center")
public class CenterController {

    @Autowired
    private UserDetailsService userDetailsServ;

    @Autowired
    private CenterService centerServ;




}
