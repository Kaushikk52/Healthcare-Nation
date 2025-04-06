package com.hcn.demo.repositories;

import com.hcn.demo.models.Diagnostics;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface DiagnosticsRepo extends BaseFacilityRepo<Diagnostics>, JpaSpecificationExecutor<Diagnostics> {
}
