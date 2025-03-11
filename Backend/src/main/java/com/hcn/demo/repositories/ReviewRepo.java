package com.hcn.demo.repositories;

import com.hcn.demo.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepo extends JpaRepository<Review,String> {
    List<Review> findByMedicalFacility_Id(String facilityId);

}
