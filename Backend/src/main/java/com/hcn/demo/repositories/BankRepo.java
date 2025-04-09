package com.hcn.demo.repositories;

import com.hcn.demo.models.Bank;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface BankRepo  extends BaseFacilityRepo<Bank>, JpaSpecificationExecutor<Bank> {
}
