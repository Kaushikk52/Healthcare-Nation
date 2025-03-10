package com.hcn.demo.services;

import com.hcn.demo.models.Rating;
import com.hcn.demo.repositories.RatingRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {

    private final RatingRepo ratingRepo;

    @Autowired
    public RatingService(RatingRepo ratingRepo){
        this.ratingRepo = ratingRepo;
    }

    public List<Rating> getRatingsByFacility(String id){
        List<Rating> ratings = ratingRepo.findByMedicalFacility_Id(id);
        return ratings;
    }
}
