package com.hcn.demo.services;

import com.hcn.demo.repositories.ClinicRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClinicService {
    private final ClinicRepo clinicRepo;

    @Autowired
    public ClinicService(ClinicRepo clinicRepo){
        this.clinicRepo = clinicRepo;
    }




}
