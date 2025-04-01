package com.hcn.demo.dto;

import com.hcn.demo.models.Transport;
import lombok.Data;

import java.util.List;

@Data
public class TransportUpdateRequest {
    Transport transport;
    private List<String> imagesToDelete;
}
