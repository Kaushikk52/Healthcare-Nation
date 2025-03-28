package com.hcn.demo.services;

import com.hcn.demo.models.Bank;
import com.hcn.demo.models.Homecare;
import com.hcn.demo.models.MedicalFacility;
import com.hcn.demo.repositories.HomecareRepo;
import com.hcn.demo.repositories.MedicalFacilityRepo;
import com.hcn.demo.specifications.GenericSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class HomecareService {

    @Autowired
    private HomecareRepo homecareRepo;

    @Autowired
    private MedicalFacilityRepo facilityRepo;

    @Autowired
    private ImageService imageServ;

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

    public List<Homecare> getFilteredHomecare(Map<String,Object> filters){
        Specification<Homecare> spec = GenericSpecification.findByCriteria(filters);
        List<Homecare> filteredHomecare = homecareRepo.findAll(spec);
        return filteredHomecare;
    }

    public Homecare edit(Homecare homecare){
        Homecare existingHomecare = this.getById(homecare.getId());
        return existingHomecare;
    }

    public String delete(String id){
        Homecare existingHomecare = this.getById(id);
        List<String> results = imageServ.deleteFiles(List.of(existingHomecare.getImages()),"Hospitals");
        homecareRepo.delete(existingHomecare);
        return "Deleted Homecare by ID : " + id;
    }


}
