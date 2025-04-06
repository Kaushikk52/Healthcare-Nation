package com.hcn.demo.repositories;

import com.hcn.demo.models.Homecare;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface HomecareRepo extends BaseFacilityRepo<Homecare>, JpaSpecificationExecutor<Homecare> {
}
