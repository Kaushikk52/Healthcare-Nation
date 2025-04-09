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
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DiagnosticsService {

    private final DiagnosticsRepo diagnosticsRepo;
    private final MedicalFacilityRepo facilityRepo;
    private final ImageService imageServ;
    private final RatingRepo ratingRepo;
    private final ReviewRepo reviewRepo;
    private final UserRepo userRepo;
    private final UserDetailsService userDetailsService;
    private final FacilityRepositoryRegistry facilityRegistry;

    public Diagnostics addDiagnostics(Diagnostics diagnostics){
        List<String> ids = diagnostics.getMedicalFacilities().stream()
                .map(MedicalFacility::getId)
                .collect(Collectors.toList());
        List<MedicalFacility> facilityList =  facilityRepo.findAllById(ids);
        diagnostics.setMedicalFacilities(facilityList);
        return diagnosticsRepo.save(diagnostics);
    }

    public List<Diagnostics> getAll(){
        List<Diagnostics> diagnosticsList = diagnosticsRepo.findAll();
        return diagnosticsList;
    }

    public Diagnostics getById(String id){
        Diagnostics diagnostics = diagnosticsRepo.findById(id).orElseThrow(() -> new RuntimeException("Not found..."));
        return diagnostics;
    }

    public List<Diagnostics> getFilteredDiagnostics(Map<String,Object> filters){
        Specification<Diagnostics> spec = GenericSpecification.findByCriteria(filters);
        List<Diagnostics> filteredDiagnostics = diagnosticsRepo.findAll(spec);
        return filteredDiagnostics;
    }

    public void addRating(String id, Rating rating, Principal principal) {
        BaseFacilityRepo<Diagnostics> repo = facilityRegistry.getRepository(Diagnostics.class);
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

    public Diagnostics updateAverageRating(String id){
        Diagnostics diagnostic = this.getById(id);
        Double avgRating = ratingRepo.calculateAverageRatingByFacilityId(id);
        diagnostic.setAvgRating(avgRating);
        return diagnosticsRepo.save(diagnostic);
    }

    public void addReview(String id, Review review,Principal principal){
        BaseFacilityRepo<Diagnostics> repo = facilityRegistry.getRepository(Diagnostics.class);
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

    public Diagnostics edit(Diagnostics diagnostics,List<String> deleteImages){
        Diagnostics existingDiagnostics = this.getById(diagnostics.getId());
        List<String> results = imageServ.deleteFiles(deleteImages,"Hospitals");
        BeanUtils.copyProperties(diagnostics,existingDiagnostics,"createdAt");
        return diagnosticsRepo.save(existingDiagnostics);
    }

    public String delete(String id){
        Diagnostics existingDiagnostics = this.getById(id);
        List<String> results = imageServ.deleteFiles(existingDiagnostics.getImages(),"Hospitals");
        diagnosticsRepo.delete(existingDiagnostics);
        return "Deleted Diagnostics by ID : " + id;
    }
}
