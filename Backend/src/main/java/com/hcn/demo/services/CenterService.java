package com.hcn.demo.services;

import com.hcn.demo.helper.FacilityRepositoryRegistry;
import com.hcn.demo.models.*;
import com.hcn.demo.repositories.BaseFacilityRepo;
import com.hcn.demo.repositories.CenterRepo;
import com.hcn.demo.repositories.RatingRepo;
import com.hcn.demo.specifications.GenericSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CenterService {
    private final CenterRepo centerRepo;
    private final ImageService imageServ;
    private final RatingRepo ratingRepo;
    private final UserDetailsService userDetailsService;
    private final FacilityRepositoryRegistry facilityRegistry;


    public Center addCenter(Center center, User principalUser){
        center.setUser(principalUser);
        Center savedCenter = centerRepo.save(center);
        return savedCenter;
    }

    public List<Center> getAll(){
        return centerRepo.findAll();
    }

    public List<Center> getAllByType(String type){
        return centerRepo.findByType(Center.CenterType.valueOf(type));
    }

    public Center getById(String id){
        return centerRepo.findById(id).orElseThrow(() -> new RuntimeException("Not found ..."));
    }

    public List<Center> getFilteredCenters(Map<String,Object> filters){
        Specification<Center> spec = GenericSpecification.findByCriteria(filters);
        List<Center> filteredCenters = centerRepo.findAll(spec);
        return filteredCenters;
    }

    public void addRating(String id, Rating rating, Principal principal) {
        BaseFacilityRepo<Center> repo = facilityRegistry.getRepository(Center.class);
        BaseFacility facility = repo.findById(id).orElseThrow(() -> new RuntimeException("Facility not found with id: " + id));

        User principalUser = (User) userDetailsService.loadUserByUsername(principal.getName());

        List<Rating> existingRatings = facility.getRatings();
        if (existingRatings == null || existingRatings.isEmpty()) {
            // Add new rating
            rating.setFacility(facility);
            rating.setUser(principalUser);
//            if (facility.getRatings() == null) {
//                facility.setRatings(new ArrayList<>());
//            }
            facility.addRating(rating);
            ratingRepo.save(rating);
        } else {
            Optional<Rating> existingUserRating = existingRatings.stream()
                    .filter(r -> r.getUser().equals(principalUser))
                    .findFirst();

            if (existingUserRating.isPresent()) {
                // Update
                existingUserRating.get().setRating(rating.getRating());
                ratingRepo.save(existingUserRating.get());
            } else {
                // Add new for different user
                rating.setFacility(facility);
                rating.setUser(principalUser);
                facility.addRating(rating);
                ratingRepo.save(rating);
            }
        }
    }

    public Center updateAverageRating(String id){
        Center center = this.getById(id);
        Double avgRating = ratingRepo.calculateAverageRatingByFacilityId(id);
        center.setAvgRating(avgRating);
        return centerRepo.save(center);
    }

    public Center updateCenter(Center center,List<String> deleteImages){
        Center existingCenter =  centerRepo.findById(center.getId()).orElseThrow(() -> new RuntimeException("Not found ..."));
        List<String> results = imageServ.deleteFiles(deleteImages,"Hospitals");
        existingCenter.setMedicalFacilities(center.getMedicalFacilities());
        BeanUtils.copyProperties(center,existingCenter,"createdAt","medicalFacilities");
        return centerRepo.save(existingCenter);
    }

    public void deleteCenter(String id){
        Center existingCenter =  centerRepo.findById(id).orElseThrow(() -> new RuntimeException("Not found ..."));
        List<String> results = imageServ.deleteFiles(existingCenter.getImages(),"Hospitals");
        centerRepo.delete(existingCenter);

    }



}
