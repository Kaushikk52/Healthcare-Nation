package com.hcn.demo.services;

import com.hcn.demo.helper.FacilityRepositoryRegistry;
import com.hcn.demo.models.*;
import com.hcn.demo.repositories.BaseFacilityRepo;
import com.hcn.demo.repositories.SavedFacilityRepo;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class SavedFacilityService {


    private final FacilityRepositoryRegistry facilityRegistry;
    private final SavedFacilityRepo savedFacilityRepo;
    private final UserService userService;



    public <T extends BaseFacility> void saveFacility(String facilityId, Class<T> clazz, Principal principal) {
        String userId = userService.getCurrentUserRole(principal).getId();
        BaseFacilityRepo<T> repo = facilityRegistry.getRepository(clazz);

        T facility = repo.findById(facilityId)
                .orElseThrow(() -> new RuntimeException("Facility not found"));

        // Check if already saved
        if (savedFacilityRepo.existsByUser_IdAndFacility_Id(userId, facilityId)) {
            facility.setIsSaved(true);
            repo.save(facility);
            throw new RuntimeException("Already saved");
        }
        facility.setIsSaved(true);
        repo.save(facility);

        SavedFacility saved = SavedFacility.builder()
                .user(User.builder().id(userId).build())
                .facility(facility)
                .build();

        SavedFacility.FacilityKind kind = switch (facility) {
            case MedicalFacility __ -> SavedFacility.FacilityKind.MEDICAL;
            case Bank __ -> SavedFacility.FacilityKind.BANK;
            case Center __ -> SavedFacility.FacilityKind.CENTER;
            case Diagnostics __ -> SavedFacility.FacilityKind.DIAGNOSTICS;
            case Homecare __ -> SavedFacility.FacilityKind.HOMECARE;
            case Transport __ -> SavedFacility.FacilityKind.TRANSPORT;
            case Orthotics __ -> SavedFacility.FacilityKind.ORTHOTICS;
            default -> throw new IllegalArgumentException("Unknown facility type");
        };

        saved.setFacilityKind(kind);

        savedFacilityRepo.save(saved);
    }

    @Transactional
    public <T extends BaseFacility> void unsaveFacility(String facilityId, Class<T> clazz, Principal principal) {
        String userId = userService.getCurrentUserRole(principal).getId();
        BaseFacilityRepo<T> repo = facilityRegistry.getRepository(clazz);

        T facility = repo.findById(facilityId)
                .orElseThrow(() -> new RuntimeException("Facility not found"));

        facility.setIsSaved(false);
        repo.save(facility);

        savedFacilityRepo.deleteByUser_IdAndFacility_Id(userId, facilityId);
    }

    public List<SavedFacility> getFilteredSavedFacilities(
            Principal principal,
            Optional<String> type,
            Optional<MedicalFacility.FacilityType> facilityType,
            Optional<Center.CenterType> centerType
    ) {
        String userId = userService.getCurrentUserRole(principal).getId();
        List<SavedFacility> all = savedFacilityRepo.findByUser_Id(userId);

        return all.stream()
                .filter(saved -> {
                    BaseFacility base = saved.getFacility();

                    // Filter by type (medical, bank, center, etc.)
                    if (type.isPresent()) {
                        String expected = type.get().toLowerCase();
                        boolean matches = switch (expected) {
                            case "medical" -> base instanceof MedicalFacility;
                            case "bank" -> base instanceof Bank;
                            case "diagnostics" -> base instanceof Diagnostics;
                            case "center" -> base instanceof Center;
                            case "homecare" -> base instanceof Homecare;
                            case "transport" -> base instanceof Transport;
                            case "orthotics" -> base instanceof Orthotics;
                            default -> false;
                        };
                        if (!matches) return false;
                    }

                    // If medical facilityType is specified
                    if (facilityType.isPresent() && base instanceof MedicalFacility med) {
                        return med.getFacilityType().equals(facilityType.get());
                    }

                    // If center centerType is specified
                    if (centerType.isPresent() && base instanceof Center center) {
                        return center.getType().equals(centerType.get());
                    }

                    return true;
                })
                .toList();
    }
}
