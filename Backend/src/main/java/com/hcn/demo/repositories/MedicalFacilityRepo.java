package com.hcn.demo.repositories;

import com.hcn.demo.models.MedicalFacility;
import com.hcn.demo.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicalFacilityRepo extends JpaRepository<MedicalFacility,String>, JpaSpecificationExecutor<MedicalFacility> {

    List<MedicalFacility> findByFacilityType(MedicalFacility.FacilityType type);

    List<MedicalFacility> findByUser_Id(String id);
}
