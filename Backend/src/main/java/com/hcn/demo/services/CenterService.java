package com.hcn.demo.services;

import com.hcn.demo.models.Center;
import com.hcn.demo.models.User;
import com.hcn.demo.repositories.CenterRepo;
import com.hcn.demo.specifications.GenericSpecification;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class CenterService {

    @Autowired
    private CenterRepo centerRepo;

    @Autowired
    private ImageService imageServ;


    public Center addCenter(Center center, User principalUser){
        center.setUser(principalUser);
        Center savedCenter = centerRepo.save(center);
        return savedCenter;
    }

    public List<Center> getAll(){
        return centerRepo.findAll();
    }

    public List<Center> getAllByType(String type){
        return centerRepo.findByType(Center.CenterType.valueOf(type));
    }

    public Center getById(String id){
        return centerRepo.findById(id).orElseThrow(() -> new RuntimeException("Not found ..."));
    }

    public List<Center> getFilteredCenters(Map<String,Object> filters){
        Specification<Center> spec = GenericSpecification.findByCriteria(filters);
        List<Center> filteredCenters = centerRepo.findAll(spec);
        return filteredCenters;
    }

    public Center updateCenter(Center center,List<String> deleteImages){
        Center existingCenter =  centerRepo.findById(center.getId()).orElseThrow(() -> new RuntimeException("Not found ..."));
        List<String> results = imageServ.deleteFiles(deleteImages,"Hospitals");
        existingCenter.setMedicalFacilities(center.getMedicalFacilities());
        BeanUtils.copyProperties(center,existingCenter,"createdAt","medicalFacilities");
        return centerRepo.save(existingCenter);
    }

    public void deleteCenter(String id){
        Center existingCenter =  centerRepo.findById(id).orElseThrow(() -> new RuntimeException("Not found ..."));
        List<String> results = imageServ.deleteFiles(existingCenter.getImages(),"Hospitals");
        centerRepo.delete(existingCenter);

    }



}
