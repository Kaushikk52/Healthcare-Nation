package com.hcn.demo.repositories;

import com.hcn.demo.models.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepo  extends JpaRepository<Rating,String> {
    List<Rating> findByFacility_Id(String facilityId);

    @Query("SELECT COALESCE(AVG(r.rating), 0) FROM Rating r WHERE r.facility.id = :facilityId")
    Double calculateAverageRatingByFacilityId(@Param("facilityId") String facilityId);
}
