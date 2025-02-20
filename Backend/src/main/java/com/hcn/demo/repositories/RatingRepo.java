package com.hcn.demo.repositories;

import com.hcn.demo.models.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RatingRepo  extends JpaRepository<Rating,String> {

    @Query("SELECT AVG(r.rating) FROM Rating r WHERE r.hospital.id = :hospitalId")
    Double findAverageRatingByHospitalId(@Param("hospitalId") String hospitalId);

    @Query("SELECT AVG(r.rating) FROM Rating r WHERE r.clinic.id = :clinicId")
    Double findAverageRatingByClinicId(@Param("clinicId") String clinicId);
}
