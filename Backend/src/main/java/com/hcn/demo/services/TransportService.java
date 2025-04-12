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
public class TransportService {

    private final TransportRepo transportRepo;
    private final MedicalFacilityRepo facilityRepo;
    private final ImageService imageServ;
    private final RatingRepo ratingRepo;
    private final ReviewRepo reviewRepo;
    private final UserRepo userRepo;
    private final UserDetailsService userDetailsService;
    private final FacilityRepositoryRegistry facilityRegistry;


    public Transport addTransport(Transport transport){
        List<String> ids = transport.getMedicalFacilities().stream()
                .map(MedicalFacility::getId)
                .collect(Collectors.toList());
        List<MedicalFacility> facilityList =  facilityRepo.findAllById(ids);
        transport.setMedicalFacilities(facilityList);
        return transportRepo.save(transport);
    }

    public List<Transport> getAll(){
        List<Transport> transportList = transportRepo.findAll();
        return transportList;
    }

    public Transport getById(String id){
        Transport transport = transportRepo.findById(id).orElseThrow(() -> new RuntimeException("Not found..."));
        return transport;
    }

    public List<Transport> getFilteredTransport(Map<String,Object> filters){
        Specification<Transport> spec = GenericSpecification.findByCriteria(filters);
        List<Transport> filteredTransport = transportRepo.findAll(spec);
        return filteredTransport;
    }

    public void addRating(String id, Rating rating, Principal principal) {
        BaseFacilityRepo<Transport> repo = facilityRegistry.getRepository(Transport.class);
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

    public Transport updateAverageRating(String id){
        Transport transport = this.getById(id);
        Double avgRating = ratingRepo.calculateAverageRatingByFacilityId(id);
        transport.setAvgRating(avgRating);
        return transportRepo.save(transport);
    }

    public void addReview(String id, Review review,Principal principal){
        BaseFacilityRepo<Transport> repo = facilityRegistry.getRepository(Transport.class);
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

    public Transport edit(Transport transport,List<String> deleteImages){
        Transport existingTransport = this.getById(transport.getId());
        List<String> results = imageServ.deleteFiles(deleteImages,"Hospitals");
        BeanUtils.copyProperties(transport,existingTransport,"createdAt","ratings","reviews");
        return transportRepo.save(existingTransport);
    }

    public String delete(String id){
        Transport existingTransport = this.getById(id);
        List<String> results = imageServ.deleteFiles(existingTransport.getImages(),"Hospitals");
        transportRepo.delete(existingTransport);
        return "Deleted Transport by ID : " + id;
    }

}
