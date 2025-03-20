package com.hcn.demo.services;

import com.hcn.demo.models.Bank;
import com.hcn.demo.models.Diagnostics;
import com.hcn.demo.models.MedicalFacility;
import com.hcn.demo.repositories.DiagnosticsRepo;
import com.hcn.demo.repositories.MedicalFacilityRepo;
import com.hcn.demo.specifications.GenericSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DiagnosticsService {

    @Autowired
    private DiagnosticsRepo diagnosticsRepo;

    @Autowired
    private MedicalFacilityRepo facilityRepo;

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

    public Diagnostics edit(Diagnostics diagnostics){
        Diagnostics existingDiagnostics = this.getById(diagnostics.getId());
        return existingDiagnostics;
    }

    public String delete(String id){
        Diagnostics existingDiagnostics = this.getById(id);
        diagnosticsRepo.delete(existingDiagnostics);
        return "Deleted Diagnostics by ID : " + id;
    }
}
