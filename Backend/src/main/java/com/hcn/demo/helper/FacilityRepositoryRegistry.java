package com.hcn.demo.helper;

import com.hcn.demo.models.*;
import com.hcn.demo.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class FacilityRepositoryRegistry {
    private final Map<Class<? extends BaseFacility>, BaseFacilityRepo<?>> repoMap = new HashMap<>();

    @Autowired
    public FacilityRepositoryRegistry(MedicalFacilityRepo medicalFacilityRepo, BankRepo bankRepo,
                                      CenterRepo centerRepo, DiagnosticsRepo diagnosticsRepo,
                                      HomecareRepo homecareRepo, OrthoticsRepo orthoticsRepo,
                                      TransportRepo transportRepo
                                      ){

        repoMap.put(MedicalFacility.class,medicalFacilityRepo);
        repoMap.put(Bank.class, bankRepo);
        repoMap.put(Center.class,centerRepo);
        repoMap.put(Diagnostics.class,diagnosticsRepo);
        repoMap.put(Homecare.class,homecareRepo);
        repoMap.put(Orthotics.class,orthoticsRepo);
        repoMap.put(Transport.class, transportRepo);
    }

    @SuppressWarnings("unchecked")
    public <T extends BaseFacility> BaseFacilityRepo<T> getRepository(Class<T> clazz) {
        return (BaseFacilityRepo<T>) repoMap.get(clazz);
    }

}
