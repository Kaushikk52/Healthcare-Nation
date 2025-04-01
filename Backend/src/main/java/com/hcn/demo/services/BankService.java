package com.hcn.demo.services;

import com.hcn.demo.models.Bank;
import com.hcn.demo.models.MedicalFacility;
import com.hcn.demo.repositories.BankRepo;
import com.hcn.demo.repositories.MedicalFacilityRepo;
import com.hcn.demo.specifications.GenericSpecification;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class BankService {

    @Autowired
    private BankRepo bankRepo;

    @Autowired
    private MedicalFacilityRepo facilityRepo;

    @Autowired
    private ImageService imageServ;


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

    public Bank edit(Bank bank,List<String> deleteImages){
        Bank existingBank = this.getById(bank.getId());
        List<String> results = imageServ.deleteFiles(deleteImages,"Hospitals");
        BeanUtils.copyProperties(bank,existingBank,"createdAt");
        existingBank.setUpdatedAt(LocalDateTime.now());
        return bankRepo.save(existingBank);
    }

    public String delete(String id){
        Bank existingBank = this.getById(id);
        List<String> results = imageServ.deleteFiles(List.of(existingBank.getImages()),"Hospitals");
        bankRepo.delete(existingBank);
        return "Deleted Bank by ID : " + id;
    }
}
