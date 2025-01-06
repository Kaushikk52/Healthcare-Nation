package com.hcn.demo.repositories;

import com.hcn.demo.models.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RatingRepo  extends JpaRepository<Rating,String> {

}
