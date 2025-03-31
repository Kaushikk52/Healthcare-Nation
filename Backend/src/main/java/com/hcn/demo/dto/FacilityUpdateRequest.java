package com.hcn.demo.dto;

import com.hcn.demo.models.MedicalFacility;
import lombok.Data;

import java.util.List;

@Data
public class FacilityUpdateRequest {
    private MedicalFacility facility;
    private List<String> imagesToDelete;
}

