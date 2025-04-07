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

//    List<SavedFacility> findByUserIdAndFacilityKind(String userId, SavedFacility.FacilityKind kind);
//    boolean existsByUserIdAndFacilityId(String userId, String facilityId);
//    void deleteByUserIdAndFacilityId(String userId, String facilityId);
//    List<SavedFacility> findByUserId(String userId);

    List<SavedFacility> findByUser_Id(String userId);
    List<SavedFacility> findByUser_IdAndFacilityKind(String userId, SavedFacility.FacilityKind kind);
    boolean existsByUser_IdAndFacility_Id(String userId, String facilityId);
    void deleteByUser_IdAndFacility_Id(String userId, String facilityId);
}
