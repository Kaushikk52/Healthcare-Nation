package com.hcn.demo.repositories;

import com.hcn.demo.models.Orthotics;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface OrthoticsRepo extends BaseFacilityRepo<Orthotics>, JpaSpecificationExecutor<Orthotics> {
}
