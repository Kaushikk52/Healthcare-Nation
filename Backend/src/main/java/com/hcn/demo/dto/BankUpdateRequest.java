package com.hcn.demo.dto;

import com.hcn.demo.models.Bank;
import lombok.Data;

import java.util.List;

@Data
public class BankUpdateRequest {
    private Bank bank;
    private List<String> imagesToDelete;
}
