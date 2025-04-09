package com.hcn.demo.services;

import com.hcn.demo.helper.FacilityRepositoryRegistry;
import com.hcn.demo.models.*;
import com.hcn.demo.repositories.BaseFacilityRepo;
import com.hcn.demo.repositories.HomecareRepo;
import com.hcn.demo.repositories.MedicalFacilityRepo;
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
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HomecareService {
    private final HomecareRepo homecareRepo;
    private final MedicalFacilityRepo facilityRepo;
    private final ImageService imageServ;
    private final RatingRepo ratingRepo;
    private final UserDetailsService userDetailsService;
    private final FacilityRepositoryRegistry facilityRegistry;

    public Homecare addHomecare(Homecare homecare){
        List<String> ids = homecare.getMedicalFacilities().stream()
                .map(MedicalFacility::getId)
                .collect(Collectors.toList());
        List<MedicalFacility> facilityList =  facilityRepo.findAllById(ids);
        homecare.setMedicalFacilities(facilityList);
        return homecareRepo.save(homecare);
    }

    public List<Homecare> getAll(){
        List<Homecare> homecareList = homecareRepo.findAll();
        return homecareList;
    }

    public Homecare getById(String id){
        Homecare homecare = homecareRepo.findById(id).orElseThrow(() -> new RuntimeException("Not found..."));
        return homecare;
    }

    public List<Homecare> getFilteredHomecare(Map<String,Object> filters){
        Specification<Homecare> spec = GenericSpecification.findByCriteria(filters);
        List<Homecare> filteredHomecare = homecareRepo.findAll(spec);
        return filteredHomecare;
    }

    public void addRating(String id, Rating rating, Principal principal) {
        BaseFacilityRepo<Homecare> repo = facilityRegistry.getRepository(Homecare.class);
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

    public Homecare updateAverageRating(String id){
        Homecare homecare = this.getById(id);
        Double avgRating = ratingRepo.calculateAverageRatingByFacilityId(id);
        homecare.setAvgRating(avgRating);
        return homecareRepo.save(homecare);
    }

    public Homecare edit(Homecare homecare,List<String> deleteImages){
        Homecare existingHomecare = this.getById(homecare.getId());
        List<String> results = imageServ.deleteFiles(deleteImages,"Hospitals");
        BeanUtils.copyProperties(homecare,existingHomecare,"createdAt");
        return homecareRepo.save(existingHomecare);
    }

    public String delete(String id){
        Homecare existingHomecare = this.getById(id);
        List<String> results = imageServ.deleteFiles(existingHomecare.getImages(),"Hospitals");
        homecareRepo.delete(existingHomecare);
        return "Deleted Homecare by ID : " + id;
    }


}
