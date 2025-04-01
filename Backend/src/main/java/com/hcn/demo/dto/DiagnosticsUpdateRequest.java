package com.hcn.demo.dto;

import com.hcn.demo.models.Diagnostics;
import lombok.Data;

import java.util.List;

@Data
public class DiagnosticsUpdateRequest {
    Diagnostics diagnostics;
    private List<String> imagesToDelete;
}
