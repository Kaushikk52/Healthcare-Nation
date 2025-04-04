package com.hcn.demo.dto;

import com.hcn.demo.models.Center;
import lombok.Data;

import java.util.List;

@Data
public class CenterUpdateRequest {
    Center center;
    private List<String> imagesToDelete;
}
