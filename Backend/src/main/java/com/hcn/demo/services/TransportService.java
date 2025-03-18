package com.hcn.demo.services;

import com.hcn.demo.models.MedicalFacility;
import com.hcn.demo.models.Transport;
import com.hcn.demo.repositories.MedicalFacilityRepo;
import com.hcn.demo.repositories.TransportRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TransportService {

    @Autowired
    private TransportRepo transportRepo;

    @Autowired
    private MedicalFacilityRepo facilityRepo;


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

    public Transport edit(Transport transport){
        Transport existingTransport = this.getById(transport.getId());
        return existingTransport;
    }

    public String delete(String id){
        Transport existingTransport = this.getById(id);
        transportRepo.delete(existingTransport);
        return "Deleted Transport by ID : " + id;
    }

}
