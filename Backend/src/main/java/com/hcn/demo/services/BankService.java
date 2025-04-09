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
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BankService {

    private final BankRepo bankRepo;
    private final MedicalFacilityRepo facilityRepo;
    private final ImageService imageServ;
    private final RatingRepo ratingRepo;
    private final ReviewRepo reviewRepo;
    private final UserRepo userRepo;
    private final UserDetailsService userDetailsService;
    private final FacilityRepositoryRegistry facilityRegistry;

    public Bank addBank(Bank bank){
        List<String> ids = bank.getMedicalFacilities().stream()
                .map(MedicalFacility::getId)
                .collect(Collectors.toList());
        List<MedicalFacility> facilityList =  facilityRepo.findAllById(ids);
        bank.setMedicalFacilities(facilityList);
        return bankRepo.save(bank);
    }

    public List<Bank> getAll(){
        List<Bank> bankList = bankRepo.findAll();
        return bankList;
    }

    public Bank getById(String id){
        Bank bank = bankRepo.findById(id).orElseThrow(() -> new RuntimeException("Not found..."));
        return bank;
    }

    public List<Bank> getFilteredBanks(Map<String,Object> filters){
        Specification<Bank> spec = GenericSpecification.findByCriteria(filters);
        List<Bank> filteredBanks = bankRepo.findAll(spec);
        return filteredBanks;
    }

    public void addRating(String id, Rating rating, Principal principal) {
        BaseFacilityRepo<Bank> repo = facilityRegistry.getRepository(Bank.class);
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

    public Bank updateAverageRating(String id){
        Bank bank = this.getById(id);
        Double avgRating = ratingRepo.calculateAverageRatingByFacilityId(id);
        bank.setAvgRating(avgRating);
        return bankRepo.save(bank);
    }

    public void addReview(String id, Review review,Principal principal){
        BaseFacilityRepo<Bank> repo = facilityRegistry.getRepository(Bank.class);
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

    public Bank edit(Bank bank,List<String> deleteImages){
        Bank existingBank = this.getById(bank.getId());
        List<String> results = imageServ.deleteFiles(deleteImages,"Hospitals");
        BeanUtils.copyProperties(bank,existingBank,"createdAt");
        return bankRepo.save(existingBank);
    }

    public String delete(String id){
        Bank existingBank = this.getById(id);
        List<String> results = imageServ.deleteFiles(existingBank.getImages(),"Hospitals");
        bankRepo.delete(existingBank);
        return "Deleted Bank by ID : " + id;
    }
}
