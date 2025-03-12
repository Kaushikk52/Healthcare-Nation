package com.hcn.demo.repositories;

import com.hcn.demo.models.SavedFacility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SavedFacilityRepo extends JpaRepository<SavedFacility,String> {

    List<SavedFacility> findByUserId(String userId);
    boolean existsByUserIdAndHospitalId(String userId, String hospitalId);
    void deleteByUserIdAndHospitalId(String userId, String hospitalId);

}
