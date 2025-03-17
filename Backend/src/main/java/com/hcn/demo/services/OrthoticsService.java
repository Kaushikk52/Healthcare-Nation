package com.hcn.demo.services;

import com.hcn.demo.models.MedicalFacility;
import com.hcn.demo.models.Orthotics;
import com.hcn.demo.repositories.MedicalFacilityRepo;
import com.hcn.demo.repositories.OrthoticsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class OrthoticsService {

    @Autowired
    private OrthoticsRepo orthoticsRepo;

    @Autowired
    private MedicalFacilityRepo facilityRepo;


    public Orthotics addOP(Orthotics op){
        List<String> ids = op.getMedicalFacilities().stream().map(MedicalFacility::getId) .collect(Collectors.toList());
        List<MedicalFacility> facilityList =  facilityRepo.findAllById(ids);
        op.setMedicalFacilities(facilityList);
        return orthoticsRepo.save(op);
    }

    public List<Orthotics> getAll(){
        List<Orthotics> orthoticsList = orthoticsRepo.findAll();
        return orthoticsList;
    }

    public Orthotics getById(String id){
        Orthotics orthotics = orthoticsRepo.findById(id).orElseThrow(() -> new RuntimeException("Not found..."));
        return orthotics;
    }

    public Orthotics edit(Orthotics op){
        Orthotics existingOrthotics = this.getById(op.getId());
        return  existingOrthotics;
    }


    public String delete(String id){
        Orthotics existingOrthotics = this.getById(id);
        orthoticsRepo.delete(existingOrthotics);
        return "Deleted OP by ID : " + id;
    }


}
