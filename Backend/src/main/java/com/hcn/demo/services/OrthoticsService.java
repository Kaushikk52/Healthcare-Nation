package com.hcn.demo.services;

import com.hcn.demo.helper.FacilityRepositoryRegistry;
import com.hcn.demo.models.*;
import com.hcn.demo.repositories.*;
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
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrthoticsService {

    private final OrthoticsRepo orthoticsRepo;
    private final MedicalFacilityRepo facilityRepo;
    private final ImageService imageServ;
    private final RatingRepo ratingRepo;
    private final ReviewRepo reviewRepo;
    private final UserRepo userRepo;
    private final UserDetailsService userDetailsService;
    private final FacilityRepositoryRegistry facilityRegistry;


    public Orthotics addOP(Orthotics op){
        List<String> ids = op.getMedicalFacilities().stream().map(MedicalFacility::getId) .collect(Collectors.toList());
        List<MedicalFacility> facilityList =  facilityRepo.findAllById(ids);
        op.setMedicalFacilities(facilityList);
        return orthoticsRepo.save(op);
    }

    public List<Orthotics> getAll(){
        List<Orthotics> orthoticsList = orthoticsRepo.findAll();
        return orthoticsList;
    }

    public Orthotics getById(String id){
        Orthotics orthotics = orthoticsRepo.findById(id).orElseThrow(() -> new RuntimeException("Not found..."));
        return orthotics;
    }
    public List<Orthotics> getFilteredOrthotics(Map<String,Object> filters){
        Specification<Orthotics> spec = GenericSpecification.findByCriteria(filters);
        List<Orthotics> filteredOrthotics = orthoticsRepo.findAll(spec);
        return filteredOrthotics;
    }

    public void addRating(String id, Rating rating, Principal principal) {
        BaseFacilityRepo<Orthotics> repo = facilityRegistry.getRepository(Orthotics.class);
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

    public Orthotics updateAverageRating(String id){
        Orthotics orthotics = this.getById(id);
        Double avgRating = ratingRepo.calculateAverageRatingByFacilityId(id);
        orthotics.setAvgRating(avgRating);
        return orthoticsRepo.save(orthotics);
    }

    public void addReview(String id, Review review,Principal principal){
        BaseFacilityRepo<Orthotics> repo = facilityRegistry.getRepository(Orthotics.class);
        BaseFacility facility =  repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Facility not found with id: " + id));
        facility.addReview(review);
        review.setFacility(facility);
        User principalUser = (User)userDetailsService.loadUserByUsername(principal.getName());
        review.setUser(principalUser);
        principalUser.setTotalReviews(principalUser.getTotalReviews()+1);
        userRepo.save(principalUser);
        reviewRepo.save(review);

    }

    public Orthotics edit(Orthotics op,List<String> deleteImages){
        Orthotics existingOrthotics = this.getById(op.getId());
        List<String> results = imageServ.deleteFiles(deleteImages,"Hospitals");
        BeanUtils.copyProperties(op,existingOrthotics,"createdAt","ratings","reviews");
        return orthoticsRepo.save(existingOrthotics);
    }


    public String delete(String id){
        Orthotics existingOrthotics = this.getById(id);
        List<String> results = imageServ.deleteFiles(existingOrthotics.getImages(),"Hospitals");
        orthoticsRepo.delete(existingOrthotics);
        return "Deleted OP by ID : " + id;
    }


}
