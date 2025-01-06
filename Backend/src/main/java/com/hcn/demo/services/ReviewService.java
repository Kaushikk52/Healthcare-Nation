package com.hcn.demo.services;

import com.hcn.demo.models.Review;
import com.hcn.demo.repositories.ReviewRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
public class ReviewService {

    private final ReviewRepo reviewRepo;

    @Autowired
    public ReviewService(ReviewRepo reviewRepo){
        this.reviewRepo = reviewRepo;
    }



}
