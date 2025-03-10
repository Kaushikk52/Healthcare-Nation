package com.hcn.demo.repositories;

import com.hcn.demo.models.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepo  extends JpaRepository<Rating,String> {
    List<Rating> findByMedicalFacility_Id(String facilityId);
}
