package com.hcn.demo.services;

import com.hcn.demo.models.MedicalFacility;
import com.hcn.demo.models.SavedFacility;
import com.hcn.demo.models.User;
import com.hcn.demo.repositories.MedicalFacilityRepo;
import com.hcn.demo.repositories.SavedFacilityRepo;
import com.hcn.demo.repositories.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SavedFacilityService {

    @Autowired
    private SavedFacilityRepo savedFacilityRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private MedicalFacilityRepo medicalFacilityRepo;


    public void saveHospital(String userId, String hospitalId) {
        if (savedFacilityRepo.existsByUserIdAndHospitalId(userId, hospitalId)) {
            throw new RuntimeException("Hospital already saved");
        }

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        MedicalFacility hospital = medicalFacilityRepo.findById(hospitalId)
                .orElseThrow(() -> new RuntimeException("Hospital not found"));

        hospital.setIsSaved(true);
        medicalFacilityRepo.save(hospital);

        SavedFacility savedHospital = new SavedFacility();
        savedHospital.setUser(user);
        savedHospital.setHospital(hospital);

        savedFacilityRepo.save(savedHospital);
    }

    public List<SavedFacility> getSavedHospitals(String userId) {
        return savedFacilityRepo.findByUserId(userId);
    }

    public void removeSavedHospital(String userId, String hospitalId) {
        MedicalFacility hospital = medicalFacilityRepo.findById(hospitalId)
                .orElseThrow(() -> new RuntimeException("Hospital not found"));

        hospital.setIsSaved(false);
        medicalFacilityRepo.save(hospital);
        savedFacilityRepo.deleteByUserIdAndHospitalId(userId, hospitalId);
    }

}
