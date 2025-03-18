package com.hcn.demo.services;

import com.hcn.demo.models.Homecare;
import com.hcn.demo.models.MedicalFacility;
import com.hcn.demo.repositories.HomecareRepo;
import com.hcn.demo.repositories.MedicalFacilityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HomecareService {

    @Autowired
    private HomecareRepo homecareRepo;

    @Autowired
    private MedicalFacilityRepo facilityRepo;

    public Homecare addHomecare(Homecare homecare){
        List<String> ids = homecare.getMedicalFacilities().stream()
                .map(MedicalFacility::getId)
                .collect(Collectors.toList());
        List<MedicalFacility> facilityList =  facilityRepo.findAllById(ids);
        homecare.setMedicalFacilities(facilityList);
        return homecareRepo.save(homecare);
    }

    public List<Homecare> getAll(){
        List<Homecare> homecareList = homecareRepo.findAll();
        return homecareList;
    }

    public Homecare getById(String id){
        Homecare homecare = homecareRepo.findById(id).orElseThrow(() -> new RuntimeException("Not found..."));
        return homecare;
    }

    public Homecare edit(Homecare homecare){
        Homecare existingHomecare = this.getById(homecare.getId());
        return existingHomecare;
    }

    public String delete(String id){
        Homecare existingHomecare = this.getById(id);
        homecareRepo.delete(existingHomecare);
        return "Deleted Homecare by ID : " + id;
    }


}
