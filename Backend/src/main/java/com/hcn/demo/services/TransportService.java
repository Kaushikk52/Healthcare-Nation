package com.hcn.demo.services;

import com.hcn.demo.models.Bank;
import com.hcn.demo.models.MedicalFacility;
import com.hcn.demo.models.Transport;
import com.hcn.demo.repositories.MedicalFacilityRepo;
import com.hcn.demo.repositories.TransportRepo;
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
public class TransportService {

    @Autowired
    private TransportRepo transportRepo;

    @Autowired
    private MedicalFacilityRepo facilityRepo;

    @Autowired
    private ImageService imageServ;


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

    public Transport edit(Transport transport,List<String> deleteImages){
        Transport existingTransport = this.getById(transport.getId());
        List<String> results = imageServ.deleteFiles(deleteImages,"Hospitals");
        BeanUtils.copyProperties(transport,existingTransport,"createdAt");
        existingTransport.setUpdatedAt(LocalDateTime.now());
        return transportRepo.save(existingTransport);
    }

    public String delete(String id){
        Transport existingTransport = this.getById(id);
        List<String> results = imageServ.deleteFiles(List.of(existingTransport.getImages()),"Hospitals");
        transportRepo.delete(existingTransport);
        return "Deleted Transport by ID : " + id;
    }

}
