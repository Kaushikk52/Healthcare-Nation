package com.hcn.demo.dto;

import com.hcn.demo.models.Homecare;
import lombok.Data;

import java.util.List;

@Data
public class HomecareUpdateRequest {
    Homecare homecare;
    private List<String> imagesToDelete;
}
