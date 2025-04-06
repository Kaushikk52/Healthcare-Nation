package com.hcn.demo.repositories;

import com.hcn.demo.models.MedicalFacility;
import com.hcn.demo.models.SavedFacility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SavedFacilityRepo extends JpaRepository<SavedFacility,String> {
//    List<SavedFacility> findByUserIdAndHospital_FacilityType(String userId, MedicalFacility.FacilityType type);
//    boolean existsByUserIdAndHospitalId(String userId, String hospitalId);
//    void deleteByUserIdAndHospitalId(String userId, String hospitalId);

    boolean existsByUserIdAndFacilityId(String userId, String facilityId);
    void deleteByUserIdAndFacilityId(String userId, String facilityId);
    List<SavedFacility> findByUserId(String userId);
}
