package com.hcn.demo.dto;

import com.hcn.demo.models.Orthotics;
import lombok.Data;

import java.util.List;

@Data
public class OrthoticsUpdateRequest {
    Orthotics orthotics;
    private List<String> imagesToDelete;
}
