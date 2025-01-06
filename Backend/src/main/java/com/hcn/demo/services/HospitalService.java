package com.hcn.demo.services;

import com.hcn.demo.models.Address;
import com.hcn.demo.models.Hospital;
import com.hcn.demo.models.Rating;
import com.hcn.demo.repositories.AddressRepo;
import com.hcn.demo.repositories.HospitalRepo;
import com.hcn.demo.repositories.RatingRepo;
import com.hcn.demo.specifications.HospitalSpecification;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class HospitalService {

    private final HospitalRepo hospitalRepo;
    private final AddressRepo addressRepo;

    @Autowired
    public HospitalService(HospitalRepo hospitalRepo,AddressRepo addressRepo){
        this.hospitalRepo = hospitalRepo;
        this.addressRepo = addressRepo;
    }

    @Transactional
    public Hospital addHospital(Hospital hospital){
        Address savedAddress = addressRepo.save(hospital.getAddress());
        hospital.setAddress(savedAddress);
        return hospitalRepo.save(hospital);
    }

    public void addRatingToHospital(String hospitalId , Rating rating){
        Hospital hospital = this.getHospitalById(hospitalId);
        hospital.addRating(rating);
        hospitalRepo.save(hospital);
    }


    public List<Hospital> getAllHospitals(){
        return hospitalRepo.findAll();
    }

    public Hospital getHospitalById(String id){
        return hospitalRepo.findById(id).orElseThrow(()-> new RuntimeException("Not found ..."));
    }

    public List<Hospital> getFilteredHospitals(Map<String,Object> filters){
        Specification<Hospital> spec = HospitalSpecification.findByCriteria(filters);
        List<Hospital> filteredHosptals = hospitalRepo.findAll(spec);
        return filteredHosptals;
    }

    public Hospital updateHospital(Hospital hospital){
        Hospital existingHospital = hospitalRepo.findById(hospital.getId()).orElseThrow(()-> new RuntimeException("Not Found..."));
        existingHospital.setName(hospital.getName());
        existingHospital.setBed(hospital.getBed());
        return hospitalRepo.save(existingHospital);
    }

    public void removeHospital(String id){
        Hospital existingHospital = hospitalRepo.findById(id).orElseThrow(()-> new RuntimeException("Not Found..."));
        hospitalRepo.delete(existingHospital);
    }

}